import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import fetchAPI from "./utils/fetchAPI";

const GetDataContext = createContext();

export const GetDataProvider = ({ children }) => {
  const {
    data: invitationList = [],
    isLoading: isLoadingInvitations,
    mutate: refreshInvitations,
  } = useSWR("/api/v1/invitation", fetchAPI);
  const {
    data: guestList = [],
    isLoading: isLoadingGuests,
    mutate: refreshGuests,
  } = useSWR("/api/v1/guests", fetchAPI);
  const { data: giftList = [], isLoading: isLoadingGifts } = useSWR(
    "/api/v1/gifts",
    fetchAPI,
  );

  const [mappedInvitations, setMappedInvitations] = useState([]);
  const [mappedGuests, setMappedGuests] = useState([]);

  const [isFilterConfirmedGuests, setIsFilterConfirmedGuests] = useState(false);

  useEffect(() => {
    if (invitationList.length === 0) return;
    const invitations = [...invitationList]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((invitation) => ({
        ...invitation,
        guests: guestList.filter(
          (guest) => guest.invitation_id === invitation.id,
        ),
      }));
    setMappedInvitations(invitations);
  }, [invitationList, guestList]);

  useEffect(() => {
    if (guestList.length === 0) return;
    let confirmationFilter = null;
    if (isFilterConfirmedGuests) {
      confirmationFilter = "confirmed";
    }

    const guests = [...guestList]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((guest) => ({
        ...guest,
        invitation:
          invitationList.find((inv) => inv.id === guest.invitation_id) || {},
      }))
      .filter((guest) => {
        if (confirmationFilter === null) return true;
        return guest.confirmation_status === confirmationFilter;
      });

    setMappedGuests(guests);
  }, [guestList, invitationList, isFilterConfirmedGuests]);

  const confirmationSummary = {
    invitation: {
      total: invitationList.length,
      confirmed: invitationList.filter((i) => i.status === "entregue").length,
      declined: invitationList.filter((i) => i.status === "não entregue")
        .length,
      pending: invitationList.filter((i) => i.status === "pendente").length,
    },
    guest: {
      total: guestList.length,
      confirmed: guestList.filter((g) => g.confirmation_status === "confirmed")
        .length,
      declined: guestList.filter((g) => g.confirmation_status === "declined")
        .length,
      pending: guestList.filter(
        (g) => !g.confirmation_status || g.confirmation_status === "pending",
      ).length,
    },
    gifts: {
      total: giftList.length,
      receivedCount: giftList.filter((g) => !g.available && g.received).length,
      available: giftList.filter((g) => g.available).length,
      pending: giftList.filter((g) => !g.available && !g.received).length,
    },
  };

  const loadingData = {
    isLoadingInvitations,
    isLoadingGuests,
    isLoadingGifts,
  };

  const refresh = () => ({
    refreshInvitations,
    refreshGuests,
  });

  async function exportInvitations() {
    try {
      const response = await fetch("/api/v1/exportInvitations");
      if (!response.ok) {
        throw new Error("Erro ao gerar o arquivo");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Convites.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.log("Erro ao exportar os dados dos convites", error);
      alert("Erro ao exportar os dados");
    }
  }

  return (
    <GetDataContext.Provider
      value={{
        invitationList,
        guestList,
        giftList,
        mappedInvitations,
        mappedGuests,
        confirmationSummary,
        loadingData,
        isFilterConfirmedGuests,
        setIsFilterConfirmedGuests,
        refresh,
        exportInvitations,
      }}
    >
      {children}
    </GetDataContext.Provider>
  );
};

export const useData = () => useContext(GetDataContext);
