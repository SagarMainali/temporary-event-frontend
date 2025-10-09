import qr from "../assets/images/bar-code.svg";
import esewa from "../assets/images/esewa.svg";
import ime from "../assets/images/ime.svg";
import khalti from "../assets/images/khalti.svg";

const Bookticket = () => {
  const bookDetail = [
    {
      barcode: qr,
      day: "3 Day Plan",
      price: "Rs. 3500 /-",
      date: "Apr 23rd - Apr 26th",
      location: "Location: Event Banquet, Lalitpur",
      organiser: "Organiser: Lotus Events",
      phone: "98XXXXXXX",
      mail: "inquiry@lotusEvents.com",
      btn: "Buy Now",
      payment: [
        { name: "Khalti", logo: khalti },
        { name: "eSewa", logo: esewa },
        { name: "IME Pay", logo: ime },
      ],
    },
  ];

   
  return (
    <>
  

 
      {bookDetail.map((ticket, index) => (

        <div className="card w-[450px] p-10 max-md:p-8 max-sm:p-5 border border-[var(--color-primary)] rounded-tr-4xl rounded-bl-4xl bg-[var(--bgbook-card)] max-[500px]:w-full" key={index}>


          <div className="flex justify-end pb-5">
            <img src={ticket.barcode} alt="Barcode" />
          </div>


          <h3>{ticket.day}</h3>
          <h2 className="pb-18 max-sm:pb-8 max-md:pb-8">{ticket.price}</h2>

          <p className="pb-2">{ticket.date}</p>
          <p className="pb-2">{ticket.location}</p>
          <p>{ticket.organiser}</p>


          <div className="flex mt-14 mb-7 gap-2 max-sm:mt-8">
            <p>{ticket.phone}</p>
            <p>{ticket.mail}</p>
          </div>


          {/* <button className="btn_main w-full">{ticket.btn}</button> */}
          <button className="btn_main w-full shadow-[0_4px_4px_0px_rgba(0,0,0,0.25)]">
            {ticket.btn}
          </button>


          <div className="flex w-full gap-4 justify-between items-center mt-10">
            {ticket.payment.map((method, i) => (
              <img
                key={i}
                className=" w-[100px] max-sm:w-[80px] h-[40px]"
                
                src={method.logo}
                alt={method.name}
              />
            ))}
          </div>


        </div>

      ))}
    </>
  );
};

export default Bookticket;
