import { createContext, useState, useContext } from "react";

const ActionContext = createContext();

export const ActionContextProvider = ({ children }) => {
  const [showAction, setShowAction] = useState({
    mobileMenu: false,
    profilePop: false,
    copyPop: false,
    copyLink: false,
  });

  const [spanActive, setSpanActive] = useState(true);
  const [showLatest, setShowLatest] = useState(false);

  const handlePropfilePop = () => {
    setShowAction({ ...showAction, profilePop: !showAction.profilePop });
  };

  return (
    <ActionContext.Provider
      value={{
        showAction,
        setShowAction,
        handlePropfilePop,
        spanActive,
        setSpanActive,
        showLatest,
        setShowLatest,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};

export const useActionContext = () => useContext(ActionContext);
