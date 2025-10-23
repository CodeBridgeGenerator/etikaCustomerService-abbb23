import React from "react";
import ProjectLayout from "../../Layouts/ProjectLayout";
import { connect } from "react-redux";
import ComplaintTypesPage from "./ComplaintTypesPage";

const ComplaintTypeProjectLayoutPage = (props) => {
  return (
    <ProjectLayout>
      <ComplaintTypesPage />
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

export default connect(mapState, mapDispatch)(ComplaintTypeProjectLayoutPage);