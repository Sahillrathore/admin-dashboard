import { createContext, useContext, useState } from "react";

const Sidebarcontext = createContext(null);

export const SidebarProvider = ({ children }) => {
    const [openItemId, setOpenItemId] = useState(null);
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sidebarcontext.Provider value={{ openItemId, setOpenItemId, collapsed, setCollapsed }}>
            {children}
        </Sidebarcontext.Provider>
    )
}

export const useSidebar = () => {
    const context = useContext(Sidebarcontext);
    if (!context) {
        throw new Error("useSidebar must be used inside a SidebarProvider");
    }
    return context;
};