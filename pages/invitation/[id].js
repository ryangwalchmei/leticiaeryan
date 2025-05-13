import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Navbar } from "components/navbar/navbar";
import WpoPageTitle from "components/wpoPageTitle";
import Footer from "components/footer";
import GuestCards from "./guestCards";

// Função de busca reutilizável
const fetchAPI = async (endpoint) => {
  const response = await fetch(endpoint);
  if (!response.ok) throw new Error("Erro ao buscar dados");
  return response.json();
};

// Página principal
export default function Invitation() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: invitation,
    error,
    isLoading,
  } = useSWR(id ? `/api/v1/invitation/${id}` : null, fetchAPI);

  useEffect(() => {
    if (id && !isLoading && (error || !invitation)) {
      router.replace("/error404");
    }
  }, [id, isLoading, invitation, error, router]);

  if (isLoading || !invitation) {
    return (
      <div className="loading">
        <h2>Carregando...</h2>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <WpoPageTitle
        title={invitation.name}
        subtitle1="Confirmação de Presença"
        subtitle2={invitation.pin_code}
      />
      <GuestCards id={id} />
      <Footer />
    </>
  );
}
