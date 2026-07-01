import Pricing from "../components/Pricing";

const Plans = () => {
  return (
    <div className="max-sm:py-10 sm:pt-20">
      <Pricing />

      <p className="text-center text-gray-400 max-w-md text-sm my-14 mx-auto px-12">
        Compose a platform-ready Images post for just{" "}
        <span className="text-indigo-400 font-medium">2 credits</span>. Publish
        your best work to the community gallery.
      </p>
    </div>
  );
};

export default Plans;
