export default function NavBarComponent(props) {
  return (
    <div className="flex  py-2 px-12 justify-between">
      <div className="lg:text-xl text-md italic text-gray-800 text-opacity-90 place-items-start font-medium ">
        Seek
      </div>

      <div className="lg:text-xl text-md text-black font-medium">{props.coder}</div>
    </div>
  );
}
