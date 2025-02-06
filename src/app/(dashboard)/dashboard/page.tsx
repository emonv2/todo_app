import Navbar from "~/components/navbar";

export default function DashboardPage() {
   return (
      <>
         <div className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] font-[sans-serif] text-white">
            <Navbar />
            <div className="container mx-auto mt-2">dashboard page</div>
         </div>
      </>
   );
}
