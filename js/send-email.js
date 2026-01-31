document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("application-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    const templateParams = {
      // Személyes adatok
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      city: formData.get("city"),

      // Vállalkozási adatok
      company: formData.get("company"),
      industry: formData.get("industry"),
      team_size: formData.get("team_size"),
      revenue: formData.get("revenue"),

      // Program
      program: formData.get("program"),
      challenges: formData.get("challenges"),

      // Egyéb
      source: formData.get("source"),
      start_date: formData.get("start_date"),
      comments: formData.get("comments"),

      // Checkboxok
      terms: formData.get("terms") ? "Elfogadva" : "Nem",
      newsletter: formData.get("newsletter") ? "Igen" : "Nem"
    };

    emailjs
      .send(
        "service_5lkvmba",   // pl. service_xxxxx
        "template_r5qgyvq",  // pl. template_xxxxx
        templateParams
      )
      .then(
        () => {
          alert("Sikeres jelentkezés! Hamarosan felvesszük Önnel a kapcsolatot.");
          form.reset();
        },
        (error) => {
          console.error("EmailJS hiba:", error);
          alert("Hiba történt az elküldés során. Kérjük próbálja újra.");
        }
      );
  });
});
