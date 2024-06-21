var khodamData = {};

function generateKhodamName() {
  var name = document.getElementById("name").value;
  var notificationElement = document.getElementById("notification");

  if (name.trim() === "") {
    notificationElement.style.display = "block";
    document.getElementById("result").style.display = "none";
    return;
  }

  notificationElement.style.display = "none";

  name = name.charAt(0).toUpperCase() + name.slice(1);

  // Tambahkan kondisi khusus untuk nama "Dzikri"
  if (name === "Dzikri") {
    document.getElementById("khodam-name").textContent = "Jali";
    document.getElementById("khodam-description").textContent = "Dzikri adalah pemilik Jali, karena jali adalah bapak kamu jadi khodam kamu adalah bapakmu.";
    document.getElementById("result").style.display = "block";
    return; // Hentikan fungsi lebih lanjut jika nama adalah Dzikri
  }

  if (name === "Raka") {
    document.getElementById("khodam-name").textContent = "Koko Jambu";
    document.getElementById("khodam-description").textContent =
      "Hai Raka, khodam kamu adalah Koko Jambu, karena Koko Jambu adalah koko jambu itu koko jambu kan koko jambu pokoknya koko jambu atau pragos lah.";
    document.getElementById("result").style.display = "block";
    return; // Hentikan fungsi lebih lanjut jika nama adalah Dzikri
  }

  var khodamNames = [
    "Monyet Kutub",
    "Sendal Swallow",
    "Kadal Sakti",
    "Beat Mber",
    "Burung Hudhud",
    "Kucing Garong",
    "Toren Air",
    "Wibu",
    "Monyet Sakti",
    "Ular Naga",
    "Kelinci Ajaib",
    "Tupai Gesit",
    "Katak Beracun",
    "Landak Berduri",
    "Kura-kura Ninja",
    "Harimau Putih",
    "Beruang Kutub",
    "Rubah Ekor Sembilan",
    "Singa Emas",
    "Gajah Biru",
    "Jerapah Terbang",
    "Kangguru Perak",
    "Koala Bermata Satu",
    "Panda Raksasa",
    "Kyubi",
    "Sukuna",
    "Gojo Kiko",
    "Kelelawar Vampir",
    "Burung Merak",
    "Burung Hantu",
    "Sukaku",
    "Hagoromo",
    "Hachibi",
    "Burung Kolibri",
    "Burung Bangau",
    "Burung Camar",
    "Raka",
    "Ikan Hiu",
    "Ikan Pari",
    "Ikan Mas",
    "Ikan Koi",
    "Ikan Piranha",
    "Laba-laba Tarantula",
    "Kalajengking Raksasa",
    "Lebah Madu",
    "Kupu-kupu Raksasa",
    "Belalang Sembah",
    "Kecoa Terbang",
    "Semut Api",
    "Rayap Pelangi",
    "Kepiting Kenari",
    "Udang Galah",
    "Cacing Besar",
    "Siput Raksasa",
    "Keong Racun",
    "Bekicot Emas",
    "Lipan Biru",
    "Kumbang Badak",
    "Kunang-kunang",
    "Capung Raksasa",
    "Lalat Hijau",
    "Nyamuk Sakti",
    "Kadal Licin",
    "Burung Elang",
    "Kucing Anggora",
    "Monyet Salto",
    "Ular Kobra",
    "Kelinci Terbang",
    "Tupai Ninja",
    "Katak Loncat",
    "Landak Cerdas",
    "Kura-kura Perkasa",
    "Harimau Loreng",
    "Beruang Coklat",
    "Rubah Cerdik",
    "Singa Putih",
    "Gajah Afrika",
    "Jerapah Langit",
    "Kangguru Biru",
    "Koala Lucu",
    "Panda Mini",
    "Kelelawar Gua",
    "Burung Cendrawasih",
    "Burung Kakaktua",
    "Burung Merpati",
    "Burung Pelikan",
    "Burung Nuri",
    "Kosong",
  ];

  if (khodamData.hasOwnProperty(name)) {
    var khodamName = khodamData[name].khodamName;
    var khodamDescription = khodamData[name].khodamDescription;
  } else {
    var randomIndex = Math.floor(Math.random() * khodamNames.length);
    var khodamName = khodamNames[randomIndex];

    if (khodamName === "Kosong") {
      var khodamDescription = "Maaf, sepertinya Anda belum memiliki khodam. Jangan sedih, mungkin khodam Anda masih dalam perjalanan menuju Anda.";
    } else {
      var promptText =
        "Jelaskan khodam " +
        khodamName +
        " dalam Bahasa indonesia hanya 15 kata saja menggunakan lelucon dan berikan arti yang terlihat meyakinkan dengan mengaitkannya pada karakteristik hewan atau makhluk  dari nama " +
        name +
        ", contohnya jika khodamnya adalah Khodam kadal sakti maka contoh jawabanya kamu suka bersembunyi dengan cepat dan lincah memikat hati wanita.";

      Swal.fire({
        title: "Mohon Tunggu...",
        html: "Meminta bantuan dari alam gaib untuk mencari informasi tentang khodam Anda...",
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      axios
        .post(
          "https://api.groq.com/openai/v1/chat/completions",
          {
            messages: [
              {
                role: "user",
                content: promptText,
              },
            ],
            model: "mixtral-8x7b-32768",
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer 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",
            },
          }
        )
        .then(function (response) {
          var khodamDescription = response.data.choices[0].message.content.trim();
          khodamData[name] = {
            khodamName: khodamName,
            khodamDescription: khodamDescription,
          };
          document.getElementById("khodam-description").textContent = khodamDescription;
          document.getElementById("result").style.display = "block";
          Swal.close();
        })
        .catch(function (error) {
          console.log(error);
          Swal.fire("Oops...", "Terjadi kesalahan saat meminta bantuan dari alam gaib. Silakan coba lagi nanti.", "error");
        });
    }
  }

  document.getElementById("output-name").textContent = name;
  document.getElementById("khodam-name").textContent = khodamName;
  document.getElementById("khodam-description").textContent = khodamDescription;
}
