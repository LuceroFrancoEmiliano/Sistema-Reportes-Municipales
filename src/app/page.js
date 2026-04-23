"use client";

import Header from "@/components/Header";
import ReportList from "@/components/ReportList";
import ProcessQueue from "@/components/ProcessQueue";


export default function Home() {
  return (
    <main className=" bg-gray-200 p-2 min-h-screen">
      <Header />

      <div className=" mx-auto bg-white">
        
        <section className="bg-white rounded-lg shadow-sm overflow-hidden">
          <ReportList />
        </section>

        <section className="bg-white rounded-lg shadow-sm overflow-hidden">
          <ProcessQueue />
        </section>

      </div>
    </main>
  );
}