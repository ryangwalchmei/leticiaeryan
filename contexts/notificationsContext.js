import { createContext, useContext } from "react";
import useSWR from "swr";
import fetchAPI from "./utils/fetchAPI";
import { showToast } from "components/toasts";

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const {
    data: notificationList = [],
    isLoading: isLoadingNotifications,
    mutate: refreshNotifications,
  } = useSWR("/api/v1/notifications", fetchAPI);

  const handleReadNotification = async (id) => {
    try {
      await fetchAPI(`/api/v1/notifications/${id}`, {
        method: "PUT",
      });
      refreshNotifications();
    } catch (error) {
      console.error("Erro ao marcar como lida", error);
    }
  };

  async function handleReadAllNotifications() {
    const notificationsUnread = notificationList.filter(
      (notify) => notify.is_read === false,
    );
    try {
      notificationsUnread.forEach((notif) => {
        handleReadNotification(notif.id);
      });
    } catch (error) {
      showToast({
        icon: "error",
        title: "Erro!",
        text:
          error.message ||
          "Ocorreu um erro ao marcar todas as notificações como lidas.",
      });
    }
  }

  const createNotification = async (notificationData) => {
    try {
      await fetchAPI("/api/v1/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notificationData),
      });
      refreshNotifications();
    } catch (error) {
      console.error("Erro ao criar notificação", error);
    }
  };

  const notificationsSummary = {
    is_empty: notificationList.length === 0,
    is_contains_unread:
      notificationList.filter((notify) => notify.is_read === false).length > 0,
    total_unread: notificationList.filter((notify) => notify.is_read === false)
      .length,
  };

  return (
    <NotificationsContext.Provider
      value={{
        refreshNotifications,
        handleReadNotification,
        createNotification,
        isLoadingNotifications,
        notificationList,
        notificationsSummary,
        handleReadAllNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);
