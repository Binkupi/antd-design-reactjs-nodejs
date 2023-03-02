import $ from "jquery";
import WOW from "wowjs";
import axios from "axios";

import React, { Component, Fragment } from "react";
import SDDetailsSection from "./SD_DetailsSection";
import SDRelatedSection from "./SD_RelatedSection";
import SearchContainer from "../../containers/SearchContainer";


class ShopDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listProduct: [],
      product: {},
      slug: "",
    };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match.params.slug !== prevState.slug) {
      return { slug: nextProps.match.params.slug };
    }

    return null;
  }
  componentDidUpdate(prevProps, prevState) {
    new WOW.WOW({
      live: false,
    }).init();
    const { slug } = this.props.match.params;
    if (prevProps.match.params.slug !== slug) {
      $("#preloder").css("opacity", "1").fadeIn("fast");
      $(".loader").delay(200).fadeIn("slow");
      let product = {};
      let listProduct = [];
      if (this.props.match && this.props.match.params.slug) {
        axios({
          method: "GET",
          url: `/products/slug/${this.props.match.params.slug}`,
        }).then((response) => {
          if (response && response.status === 200) {
            product = response.data;
            axios({
              method: "GET",
              url: `/products/related/${product.id}?page=1&pageSize=4`,
            }).then((response) => {
              if (response && response.status === 200) {
                listProduct = response.data.results;
                this.setState({
                  listProduct: listProduct,
                  product: product,
                });
                $(".loader").fadeOut();
                $("#preloder").delay(200).fadeOut("slow");
              }
            });
          }
        });
      }
    }
  }

  componentDidMount() {
    let product = {};
    let listProduct = [];
    if (this.props.match && this.props.match.params.slug) {
      $("#preloder").css("opacity", "1").fadeIn("fast");
      $(".loader").delay(200).fadeIn("slow");
      axios({
        method: "GET",
        url: `/products/slug/${this.state.slug}`,
      }).then((response) => {
        if (response && response.status === 200) {
          product = response.data;
          axios({
            method: "GET",
            url: `/products/related/${product.id}?page=1&pageSize=4`,
          }).then((response) => {
            if (response && response.status === 200) {
              listProduct = response.data.results;
              this.setState({
                listProduct: listProduct,
                product: product,
              });
              $(".loader").fadeOut();
              $("#preloder").delay(200).fadeOut("slow");
            }
          });
        }
      });
    }

    /*------------------
        Background Set
        --------------------*/

    $(".set_bg").each(function () {
      var bg = $(this).data("setbg");
      $(this).css("background-image", "url(" + bg + ")");
    });

    /*-------------------
		Quantity change
        --------------------- */

    var proQty = $(".pro-qty");
    proQty.prepend('<span class="fa fa-angle-up dec qtybtn"></span>');
    proQty.append('<span class="fa fa-angle-down inc qtybtn"></span>');
    proQty.on("click", ".qtybtn", function () {
      var $button = $(this);
      var oldValue = $button.parent().find("input").val();
      var newVal;
      if ($button.hasClass("inc")) {
        newVal = parseFloat(oldValue) - 1;
      } else {
        // Don't allow decrementing below zero
        if (oldValue > 0) {
          newVal = parseFloat(oldValue) + 1;
        } else {
          newVal = 0;
        }
      }
      $button.parent().find("input").val(newVal);
    });
  }

  render() {
    return (
      <Fragment>
        <SDDetailsSection
          history={this.props.history}
          product={this.state.product}
        />
        <SDRelatedSection
          listProduct={this.state.listProduct}
          history={this.props.history}
        />
        <SearchContainer history={this.props.history} />
      </Fragment>
    );
  }
}

export default ShopDetailsPage;
