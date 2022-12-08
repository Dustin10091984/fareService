import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HOST } from "../constants";
import ServiceType from "../constants/ServiceType";
import PopularServices from "./Services/services.popular";
import HomeSearchBar from "./common/searchbar/searchbar.home";
import DownloadDialog from "./common/download.dialog";
import { useModal } from "react-hooks-use-modal";
import { useRef } from "react";
export const Index = (props) => {
  const headerMenu = useSelector((state) => state.headerMenuReducer);

  const [DownloadModal, openDownload, closeDownload] = useModal("root");
  const downloadType = useRef("APP_STORE");
  const openDownloadDialog = (type) => {
    downloadType.current = type;
    openDownload();
  };

  return (
    <>
      <div className="banner">
        <div className="container px-12">
          <div className="row">
            <div className="col-12">
              <div className="banner-sec d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap">
                <div className="banner-text mb-5 mb-md-0">
                  <div className="font-bold text-5xl text-dark tracking-[-2px] leading-tight">
                    The <span className="text-primary-main">easy</span> &
                    <span className="text-primary-main"> reliable</span> way to
                    take care of your home.
                  </div>
                  <div className="text-base text-dark mt-6">
                    We make it easy for you to create the best experience for
                    your home.
                    <br /> Book for a handyman, get a professional service or
                    shop from a wide variety of products and get them delivered
                    to your doorstep.
                  </div>
                  <div className="my-5">
                    <HomeSearchBar size="large" />
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-center relative right-[-4rem]">
                  <img
                    src="/assets/img/banner-img-background.svg"
                    className="w-[45rem]"
                  />
                  <img
                    src="/assets/img/banner-img.png"
                    className="w-[42rem] absolute"
                    alt=""
                  />
                  <img
                    src="/assets/img/banner-sub-img.png"
                    className="w-[16rem] absolute left-[-8rem]"
                  />
                  <img
                    src="/assets/img/provider-card-sample.png"
                    className="absolute w-[40rem] bottom-0 -left-[15rem]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="py-32 bg-gray-100" id={"popular-services"}>
        <div className="container">
          <PopularServices services={headerMenu} />
        </div>
      </section>

      <section className="background-checked pad-y">
        <div className="container px-12">
          <div className="row">
            <div className="col-12">
              <div className="back-check-box d-flex align-items-center justify-content-between flex-wrap flex-lg-nowrap space-x-16">
                <img
                  src="/assets/img/back-check.png"
                  className="img-fluid w-[500px]"
                  alt=""
                />

                <div className="d-flex flex-column space-y-16">
                  <div className="bg-primary-light p-10 rounded-[18px] border-primary border-b-4">
                    <h1 className="text-primary-main text-3xl  font-medium mb-10">
                      Vetted, Background - <br /> Checked Professionals
                    </h1>
                    <p className="text-base text-dark">
                      Cleaning and handyman tasks booked and paid for directly
                      through the Farenow platform are performed by experienced,
                      background-checked professionals who are highly rated by
                      customers like you.
                    </p>
                  </div>
                  <div className="bg-orange-100 p-10 rounded-[18px] border-orange-300 border-b-4">
                    <h1 className="text-orange-300 text-3xl font-medium mb-10">
                      Your Happiness, Guaranteed
                    </h1>
                    <p className="text-base text-dark">
                      Your happiness is our goal. If you’re not happy, we’ll
                      work to make it right. Our friendly customer service
                      agents are available 24 hours a day, 7 days a week. The
                      Farenow Happiness Guarantee only applies when you book and
                      pay for a service directly through the Farenow platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="download-apps pad-y bg-primary-dark">
        <div className="container">
          <div className="d-flex flex-wrap space-x-32 align-items-center flex-lg-nowrap">
            <img
              src="/assets/img/mobile-app.png"
              className="img-fluid w-[54rem]"
            />
            <div className="text-white">
              <h1 className="text-white text-5xl font-bold">
                Download the Farenow App
              </h1>
              <p className="text-base py-16">
                Book and manage appointments, message your
                pback-layerrofessional, view professional profiles and ratings,
                see real-time location of your professional and so much more.
              </p>
              <div>
                <button
                  className="fare-btn bg-gray-50 hover:bg-primary-light border-primary border-b-2 text-primary-main text-[14px] mr-8 w-[240px] px-12"
                  onClick={() => {
                    openDownloadDialog("APP_STORE");
                  }}
                >
                  <img
                    src="/assets/img/app-store-logo.svg"
                    className="float-left mx-2"
                  />
                  Download on the <br />{" "}
                  <span className="font-bold text-sm">App Store</span>
                </button>
                <button
                  className="fare-btn bg-gray-50 hover:bg-primary-light border-primary border-b-2 text-primary-main text-[14px] w-[240px] px-12"
                  onClick={() => {
                    openDownloadDialog("GOOGLE_PLAY");
                  }}
                >
                  <img
                    src="/assets/img/google-play-logo.svg"
                    className="float-left mx-2"
                  />
                  Available on the <br />{" "}
                  <span className="font-bold text-sm">Google Play</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <hr />
          </div>
        </div>
      </div>
      {/* 
      <section className="shop-for-home pad-y">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="common-heading text-center">
                <div className="title">Shop for your home with Farenow</div>
                <div className="sub-des">
                  Shop furniture, electronics, appliances, and more. Everything
                  comes with expert installation by Farenow.
                </div>
              </div>
            </div>

            <div className="col-md-12">
              <div className="shop-baner">
                <div className="hany-shop-img">
                  <img
                    src="/assets/img/shop-home.jpg"
                    alt=""
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row">
          <div className="col-12">
            <hr />
          </div>
        </div>
      </div>
    */}
      <section className="our-partners-sec pad-y bg-gray-50">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="mb-16 text-center">
                <div className="text-4xl text-primary-main font-medium">
                  Our Partners
                </div>
                <div className="text-base text-dark">
                  Farenow works with partners who want to provide their
                  customers, tenants, or employees <br /> easy access to quality
                  home services at affordable prices.
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="d-flex flex-wrap space-x-12 space-y-12 justify-center align-items-end">
                {[1, 2, 3, 4].map((partnerIdx) => (
                  <div
                    key={partnerIdx}
                    className="px-12 py-8 bg-white rounded-[16px] shadow-[0_8px_16px_0_#00000014]"
                  >
                    <img
                      src={`/assets/img/partner-${partnerIdx}.png`}
                      className="h-[4rem]"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="five-star-sec py-20 bg-[#005ECB] relative">
        <img
          src="/assets/img/pro-back1.png"
          className="absolute left-0 top-0"
        />
        <img
          src="/assets/img/pro-back2.png"
          className="absolute right-0 bottom-0"
        />
        <div className="container d-flex flex-wrap justify-between items-center px-8">
          <div className="md:basis-1/2">
            <h1 className="text-white text-[4rem] font-medium my-8">
              Are You a Five Star Professional?
            </h1>
            <p className="text-xl text-gray-100 mb-16">
              From cleaners to handymen to smart home installers, Farenow is
              always looking for service professionals who are experts in their
              trade and provide great service to their customers. The best home
              service professionals use Farenow for the great pay and flexible
              scheduling.
            </p>
            <Link
              to="/provider/registration"
              className="fare-btn fare-btn-outline-primary fare-btn-lg my-8"
            >
              Become a Farenow Pro
            </Link>
          </div>
          <img
            src="/assets/img/pro-img.png"
            className="float-right w-[400px] relative"
          />
        </div>
      </section>

      <DownloadModal>
        <DownloadDialog type={downloadType.current} />
      </DownloadModal>
    </>
  );
};
