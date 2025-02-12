import Loading from "@/components/Spinner";

export default function LoadingPage() {
    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center gap-x-4">
                <span className="text-xl">Loading</span>
                <Loading addStyle={'fill-200 h-8 w-8'} />
            </div>
        </div>
    )
}