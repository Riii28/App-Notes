import Loading from "@/components/Spinner";

export default function LoadingPage() {
    <section className="fixed w-full h-full">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loading addStyle="fill-200 w-8 h-8" />
        </div>
    </section>
}