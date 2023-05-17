// Mendapatkan referensi elemen pada halaman webuhuh
const keyInput = document.getElementById('key-input');
const submitBtn = document.getElementById('submit-btn');
const resultTable = document.getElementById('result-table').getElementsByTagName('tbody')[0];

// Mendefinisikan konstanta untuk jumlah lokasi memori
const m = 11;

// Menginisialisasi array kosong untuk menyimpan data pada setiap lokasi memori
const hashTable = new Array(m);
for (let i = 0; i < m; i++) {
  hashTable[i] = [];
}

// Fungsi untuk menghitung nilai hash
function hash(k) {
  return k % m;
}

// Menambahkan event listener untuk tombol "Hash"
submitBtn.addEventListener('click', function() {
  // Mendapatkan nilai kunci dari input
  const key = parseInt(keyInput.value);
  
  // Menghitung nilai hash
  const hashedKey = hash(key);
  
  // Menambahkan baris pada tabel untuk menampilkan hasil
  const newRow = resultTable.insertRow(-1);
  const keyCell = newRow.insertCell(0);
  const hashCell = newRow.insertCell(1);
  
  // Jika lokasi memori kosong, langsung tambahkan data ke dalamnya
  if (hashTable[hashedKey].length === 0) {
    hashTable[hashedKey].push({ key: key, hash: hashedKey });
    keyCell.innerText = key;
    hashCell.innerText = hashedKey;
  }
  // Jika terjadi collision, cari lokasi kosong pada lokasi memori berikutnya
  else {
    alert('terjadi collision data akan di pindahkan ke index selanjutnya');
    let nextIndex = (hashedKey + 1) % m;
    while (nextIndex !== hashedKey) {
      if (hashTable[nextIndex].length === 0) {
        hashTable[nextIndex].push({ key: key, hash: nextIndex });
        keyCell.innerText = key;
        hashCell.innerText = nextIndex;
        break;
      }
      nextIndex = (nextIndex + 1) % m;
    }
    // Jika tidak ada lokasi kosong pada seluruh tabel hash, tampilkan pesan error
    if (nextIndex === hashedKey) {
      alert("Tabel hash sudah penuh! Tidak bisa menambahkan data baru.");
    }
  }
});
