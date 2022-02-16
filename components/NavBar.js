export default function NavBarComponent(props) {
  return (
    <div className="flex items-center py-2 px-12 justify-between bg-gray-700">
      <span className="lg:text-xl text-md italic text-white place-items-start font-medium ">
        Seek

      </span>


      <div className="lg:text-xl text-md text-white font-medium">{props.coder}</div>
    </div>
  );
}
