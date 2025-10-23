import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import client from "../../../services/restClient";
import CommentsSection from "../../common/CommentsSection";
import ProjectLayout from "../../Layouts/ProjectLayout";

import RefundsPage from "../RefundsPage/RefundsPage";
import ComplaintsPage from "../ComplaintsPage/ComplaintsPage";
import EnquiriesPage from "../EnquiriesPage/EnquiriesPage";
import AgreementsPage from "../AgreementsPage/AgreementsPage";
import VmCollectionsPage from "../VmCollectionsPage/VmCollectionsPage";
import RelocationsPage from "../RelocationsPage/RelocationsPage";
import RentalsPage from "../RentalsPage/RentalsPage";
import ReplacementsPage from "../ReplacementsPage/ReplacementsPage";
import TerminationsPage from "../TerminationsPage/TerminationsPage";

const SingleCustomerDetailsPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState({});
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    

    useEffect(() => {
        //on mount
        client
            .service("customerDetails")
            .get(urlParams.singleCustomerDetailsId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },] }})
            .then((res) => {
                set_entity(res || {});
                
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "CustomerDetails", type: "error", message: error.message || "Failed get customerDetails" });
            });
    }, [props,urlParams.singleCustomerDetailsId]);


    const goBack = () => {
        navigate("/customerDetails");
    };

      const toggleHelpSidebar = () => {
    setHelpSidebarVisible(!isHelpSidebarVisible);
  };

  const copyPageLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        props.alert({
          title: "Link Copied",
          type: "success",
          message: "Page link copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        props.alert({
          title: "Error",
          type: "error",
          message: "Failed to copy page link.",
        });
      });
  };

    const menuItems = [
        {
            label: "Copy link",
            icon: "pi pi-copy",
            command: () => copyPageLink(),
        },
        {
            label: "Help",
            icon: "pi pi-question-circle",
            command: () => toggleHelpSidebar(),
        },
    ];

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-12">
                <div className="flex align-items-center justify-content-between">
                <div className="flex align-items-center">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Customer Details</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>customerDetails/{urlParams.singleCustomerDetailsId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Customer Name</label><p className="m-0 ml-3" >{_entity?.customerName}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Contact Number</label><p className="m-0 ml-3" >{Number(_entity?.contactNumber)}</p></div>
<div className="col-12 md:col-6 lg:col-3"><label className="text-sm text-gray-600">Email Address</label><p className="m-0 ml-3" >{_entity?.emailAddress}</p></div>
            

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
         </div>

      
    <div className="col-12 mt-2">
        <TabView>
        
                    <TabPanel header="Refunds" leftIcon="pi pi-building-columns mr-2">
                        <RefundsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Complaints" leftIcon="pi pi-building-columns mr-2">
                        <ComplaintsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Enquiries" leftIcon="pi pi-building-columns mr-2">
                        <EnquiriesPage/>
                    </TabPanel>
                    

                    <TabPanel header="Agreements" leftIcon="pi pi-building-columns mr-2">
                        <AgreementsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Vm Collections" leftIcon="pi pi-building-columns mr-2">
                        <VmCollectionsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Relocations" leftIcon="pi pi-building-columns mr-2">
                        <RelocationsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Rentals" leftIcon="pi pi-building-columns mr-2">
                        <RentalsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Replacements" leftIcon="pi pi-building-columns mr-2">
                        <ReplacementsPage/>
                    </TabPanel>
                    

                    <TabPanel header="Terminations" leftIcon="pi pi-building-columns mr-2">
                        <TerminationsPage/>
                    </TabPanel>
                    
        </TabView>
    </div>


      <CommentsSection
        recordId={urlParams.singleCustomerDetailsId}
        user={props.user}
        alert={props.alert}
        serviceName="customerDetails"
      />
      <div
        id="rightsidebar"
        className={classNames("overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out", { "hidden" : !isHelpSidebarVisible })}
        style={{ top: "60px", height: "calc(100% - 60px)" }}
      >
        <div className="flex flex-column h-full p-4">
          <span className="text-xl font-medium text-900 mb-3">Help bar</span>
          <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
        </div>
      </div>
      </div>
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SingleCustomerDetailsPage);
