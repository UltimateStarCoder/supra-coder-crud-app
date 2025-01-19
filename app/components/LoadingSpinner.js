export default function LoadingSpinner({ size = "normal" }) {
    const sizeClasses = {
        small: "h-6 w-6",
        normal: "h-12 w-12",
        large: "h-16 w-16"
    };

    return (
        <div className="flex justify-center items-center">
            <div className={`animate-spin rounded-full border-t-2 border-b-2 border-blue-500 ${sizeClasses[size]}`}></div>
        </div>
    );
}
