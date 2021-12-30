export const uiConfig = ({ firebase, auth }) => {
  return {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    tosUrl: "/terms-of-service",
    privacyPolicyUrl: "/privacy-policy",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  };
};
