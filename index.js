const express = require ('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Middleware untuk mengizinkan CORS dan parse body JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Simpan artikel dalam array
let articles = [
  {
    id: 1,
    judul: 'Minta Warga Tak Panik, Pemkot Semarang Pastikan Harga Cabai Masih Terkendali',
    gambar: 'https://media.suara.com/pictures/653x366/2022/03/03/87313-ilustrasi-cabai-deflasi-051-persen-terjadi-di-balikpapan-ini-penyebabnya-antara.webp',
    sumber: 'https://jateng.suara.com/read/2023/11/05/160000/minta-warga-tak-panik-pemkot-semarang-pastikan-harga-cabai-masih-terkendali',
    tanggal: '04 November 2023'
  },

  {
    id: 2,
    judul: 'Kitchen Garden Pertama di Medan, Wujud Kolaborasi Hotel Dukung Urban Farming',
    gambar: 'https://cdn1-production-images-kly.akamaized.net/wdThusBlIAbwF62AkYN3hUdSvwQ=/640x360/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/4644428/original/025237900_1699679111-WhatsApp_Image_2023-11-10_at_16.57.57.jpeg',
    sumber: 'https://www.liputan6.com/regional/read/5450478/kitchen-garden-pertama-di-medan-wujud-kolaborasi-hotel-dukung-urban-farming',
    tanggal: '10 November 2023'
  },

  {
    id: 3,
    judul: 'Bertani di Lahan Sempit, Intip Kisah BRInita di Jayapura',
    gambar: 'https://akcdn.detik.net.id/visual/2023/10/26/bri_169.jpeg?w=715&q=90',
    sumber: 'https://www.cnbcindonesia.com/news/20231026194411-4-484073/bertani-di-lahan-sempit-intip-kisah-brinita-di-jayapura',
    tanggal: '20 Oktober 2023'
  },

  {
    id: 4,
    judul: 'Kisah Inspiratif, Urban Farming Jadi Gaya Baru Bertani Pada Lahan Sempit',
    gambar: 'https://img.okezone.com/content/2023/10/28/455/2909903/kisah-inspirasi-brinita-urban-farming-jadi-gaya-baru-bertani-pada-lahan-sempit-eMWmvtpYmp.jpg',
    sumber: 'https://economy.okezone.com/read/2023/10/28/455/2909903/kisah-inspirasi-brinita-urban-farming-jadi-gaya-baru-bertani-pada-lahan-sempit',
    tanggal: '27 Oktober 2023'
  },

  {
    id: 5,
    judul: 'Diminta Heru Budi Hijaukan Jakarta, Dinas KPKP Gelar Festifal Urban Farming',
    gambar: 'https://asset.kompas.com/crops/JizmuSGhOr6SnxMxau5bd_PzwmY=/0x0:0x0/1200x800/data/photo/2023/10/30/653f8ba6084c9.jpg',
    sumber: 'https://megapolitan.kompas.com/read/2023/10/30/18585301/diminta-heru-budi-hijaukan-jakarta-dinas-kpkp-gelar-festival-urban',
    tanggal: '29 November 2023'
  },

  {
    id: 6,
    judul: '5 Hal yang Perlu Diperhatikan Sebelum Memulai Urban Farming',
    gambar: 'https://asset.kompas.com/crops/d-b8v9b4-WZwZUeDwWAbTAbFWB8=/0x0:1000x667/750x500/data/photo/2022/06/26/62b84043f215b.jpg',
    sumber: 'https://umkm.kompas.com/read/2023/08/18/190000383/5-hal-yang-perlu-diperhatikan-sebelum-memulai-urban-farming-vertikultur-',
    tanggal: '17 Agustus 2023'
  },

  {
    id: 7,
    judul: 'Bappenas Urban Farming Alternatif Jaga Ketahanan Pangan Berkelanjutan',
    gambar: 'https://static.republika.co.id/uploads/images/inpicture_slide/011573800-1674189411-830-556.jpg',
    sumber: 'https://ekonomi.republika.co.id/berita/rz20bp370/bappenas-urban-farming-alternatif-jaga-ketahanan-pangan-berkelanjutan',
    tanggal: '07 Agustus 2023'
  },

  {
    id: 8,
    judul: 'Urban Farming Solusi Bertani di Lahan Sempit dan Padat',
    gambar: 'https://pict-a.sindonews.net/dyn/732/pena/news/2023/09/15/768/1202485/urban-farming-solusi-bertani-di-lahan-sempit-dan-padat-penduduk-weq.jpg',
    sumber: 'https://sains.sindonews.com/read/1202485/768/urban-farming-solusi-bertani-di-lahan-sempit-dan-padat-penduduk-1694794198',
    tanggal: '11 September 2023'
  },

  {
    id: 9,
    judul: 'Dukung Green Building, ASDP Luncurkan Program Berkebun Hidroponik',
    gambar: 'https://akcdn.detik.net.id/community/media/visual/2023/07/08/asdp-berkebun-hidroponik.jpeg?w=700&q=90',
    sumber: 'https://news.detik.com/berita/d-6812590/dukung-green-building-asdp-luncurkan-program-berkebun-hidroponik',
    tanggal: '07 Juli 2023'
  },

];

// Mendapatkan daftar artikel
app.get('/api/articles', (req, res) => {
  res.json(articles);
});

// Mendapatkan artikel berdasarkan ID
app.get('/api/articles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const article = articles.find((a) => a.id === id);

  if (article) {
    res.json(article);
  } else {
    res.status(404).json({ error: 'Artikel tidak ditemukan.' });
  }
});

// Menambahkan artikel baru
app.post('/api/articles', (req, res) => {
  const { judul, gambar, sumber, tanggal } = req.body;
  const newArticle = { id: articles.length + 1, judul, gambar, sumber, tanggal };
  articles.push(newArticle);
  res.json(newArticle);
});

let berita = [

  {
    id: 1,
    judul: 'Maksimalkan Lahan Rawa, BRI Dukung Pemberdayaan Urban Farming di Surabaya',
    gambar: 'https://akcdn.detik.net.id/community/media/visual/2023/11/09/bri-peduli-urban-farming-surabaya-1_169.jpeg?w=700&q=90',
    sumber: 'https://www.detik.com/jatim/bisnis/d-7028577/maksimalkan-lahan-rawa-bri-dukung-pemberdayaan-urban-farming-di-surabaya',
    tanggal: '08 November 2023'
  },

  {
    id: 2,
    judul: 'Keren! Tempat Pembuangan Sampah Di Sulap Jadi Urban Farming',
    gambar: 'https://akcdn.detik.net.id/community/media/visual/2023/06/12/keren-tempat-pembuangan-sampah-disulap-jadi-urban-farming_169.jpeg?w=700&q=90',
    sumber: 'https://news.detik.com/foto-news/d-6768279/keren-tempat-pembuangan-sampah-disulap-jadi-urban-farming',
    tanggal: '12 Juni 2023'
  },

  {
    id: 3,
    judul: 'Yuk Belajar Atasi Hama Urban Farming',
    gambar: 'https://akcdn.detik.net.id/community/media/visual/2023/03/09/yuk-belajar-mengatasi-hama-urban-farming-4_169.jpeg?w=700&q=90',
    sumber: 'https://www.detik.com/edu/foto/d-6609369/yuk-belajar-atasi-hama-urban-farming/5',
    tanggal: '08 Maret 2023'
  },

];

// Mendapatkan daftar berita pada home
app.get('/api/berita', (req, res) => {
  res.json(berita);
});

//Mendapatkan Artikel Utama yang ada deskripsi
let Utama = [

  {
    id: 1,
    judul: '291 Rumah Tangga di Riau Melakukan Urban Farming',
    deskripsi: 'Asep Riyadi juga menambahkan bahwa masyarakat perkotaan menyediakan produk pertanian sendiri pada lahan terbatas dengan berbagai cara. Yang sebagian besarnya menggunakan media tanam pot atau polybag, sehingga mudah dipindahkan pada lahan sempit (baik di dalam ruangan atau di atap rumah). sebagai bagian dari gaya hidup yang berkelanjutan',
    gambar: 'https://mediacenter.riau.go.id/foto_berita/medium/291-rumah-tangga-di-riau-melakukan.jpg',
    sumber: 'https://mediacenter.riau.go.id/read/82674/291-rumah-tangga-di-riau-melakukan-urban-farm.html',
    tanggal: '05 Desember 2023'
  },
];

// Mendapatkan daftar artikel utama 
app.get('/api/artikel', (req, res) => {
  res.json(Utama);
});


// Simpan posting jual beli panen dalam array
let jualBeliPanen = [
  {
    id_profil: '1', // contoh id_profil sebagai UUID atau ID pengguna
    timestamp: new Date(),
    title_post: 'Penawaran Panen',
    post_content: 'Panen segar untuk dijual.',
    image: ['image1.jpg', 'image2.jpg'],
    whatsapp: '081234567890',
  },
  // ...
];


// Mendapatkan daftar jual beli panen
app.get('/api/jualbelipanen', (req, res) => {
  res.json(jualBeliPanen);
});

// Menambahkan posting jual beli panen baru
app.post('/api/jualbelipanen', (req, res) => {
  const { id_profil, title_post, post_content, image, whatsapp } = req.body;
  const newPost = {
    id_profil,
    timestamp: new Date(),
    title_post,
    post_content,
    image,
    whatsapp,
  };
  jualBeliPanen.push(newPost);
  res.json(newPost);
});


// Mulai server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});