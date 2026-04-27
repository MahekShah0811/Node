const Contact = () => {
  return (
    <section id="contact" className="py-20 text-center">
      <h2 className="text-3xl mb-6">Contact</h2>

      <form
        action="https://api.web3forms.com/submit"
        method="POST"
        className="max-w-xl mx-auto"
      >
        <input type="hidden" name="access_key" value="YOUR_KEY" />

        <input className="w-full p-2 mb-3 border" name="name" placeholder="Name" required />
        <input className="w-full p-2 mb-3 border" name="email" placeholder="Email" required />
        <textarea className="w-full p-2 mb-3 border" name="message" placeholder="Message" required />

        <button className="px-6 py-2 bg-blue-500 text-white">
          Send
        </button>
      </form>

      <div className="mt-6">
        <a href="#">LinkedIn</a> | <a href="#">GitHub</a>
      </div>
    </section>
  );
};

export default Contact;