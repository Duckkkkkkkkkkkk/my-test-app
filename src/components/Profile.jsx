import avatar from "../assets/avatar.png";
import bg from "../assets/bg.png";
import icon_mail from "../assets/icon_mail.svg";
import icon_phone from "../assets/icon_phone.svg";

export default function Profile() {
  return (
    <div className="relative w-full h-[192px] md:h-48 bg-gray-300">
      <img
        src={bg}
        alt="Background"
        className="w-full h-full object-cover"
      />

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 flex items-end space-x-2">
        <img
          src={avatar}
          alt="Avatar"
          className="w-24 h-24 md:w-28 md:h-28 rounded-full border-1 border-white"
        />

        <div className="flex flex-col md:flex-row md:items-center md:gap-4">
          <span className="text-white md:text-gray-900 font-semibold text-lg whitespace-nowrap truncate max-w-xs md:max-w-md mb-1 md:mb-0">Ricardo Cooper</span>
          <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
  <button className="flex items-center gap-2 bg-white text-gray-700 font-medium px-3 py-1 rounded shadow text-sm lg:px-4 lg:py-1 lg:text-base hover:bg-gray-100 transition">
    <img src={icon_mail} alt="Mail" className="w-3 h-3 sm:w-4 sm:h-4" />
    Message
  </button>
  <button className="flex items-center gap-2 bg-white text-gray-700 font-medium px-3 py-1 rounded shadow text-sm sm:px-4 sm:py-1 sm:text-base hover:bg-gray-100 transition">
    <img src={icon_phone} alt="Phone" className="w-3 h-3 sm:w-4 sm:h-4" />
    Call
  </button>
          </div>
        </div>
      </div>
    </div>
  );
}
