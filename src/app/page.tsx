import ClientsListWrapper from "@/components/featured/components/clients-list-wrapper";
import { Features } from "@/components/featured/components/features";
import { Hero } from "@/components/featured/components/hero";
import InfinityScrollClients from "@/components/featured/components/infinity-scroll-clients";
import { Network } from "@/components/featured/components/network";
import { Pricing } from "@/components/featured/components/pricing";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Pricing />
      <Network />
      <ClientsListWrapper />
      <InfinityScrollClients />
    </main>
  );
}
