export default function NavBarComponent(props) {
  return (
    <div className="flex items-center py-2 px-12 justify-between bg-gray-700">
      <span className="lg:text-xl text-md italic hover:opacity-80 text-white place-items-start font-medium ">
        <a href="https://github.com/matthewkim0/seekwmp" target="_blank" rel="noreferrer">
          Seek
        </a>

      </span>


      <div className="lg:text-xl text-md text-white font-medium">{props.coder}</div>
    </div>
  );
}
