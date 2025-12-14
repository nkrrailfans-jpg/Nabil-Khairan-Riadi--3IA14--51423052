let penjualan = JSON.parse(localStorage.getItem("penjualan")) || [];
let editIndex = -1;

tampilData();

function tambahData() {
    const nama = document.getElementById("nama").value;
    const harga = parseInt(document.getElementById("harga").value);
    const jumlah = parseInt(document.getElementById("jumlah").value);

    if (!nama || !harga || !jumlah) {
        alert("Lengkapi data!");
        return;
    }

    if (editIndex === -1) {
        // CREATE
        penjualan.push({ nama, harga, jumlah });
    } else {
        // UPDATE
        penjualan[editIndex] = { nama, harga, jumlah };
        editIndex = -1;
    }

    localStorage.setItem("penjualan", JSON.stringify(penjualan));

    document.getElementById("nama").value = "";
    document.getElementById("harga").value = "";
    document.getElementById("jumlah").value = "";

    tampilData();
}

function editData(index) {
    const item = penjualan[index];
    document.getElementById("nama").value = item.nama;
    document.getElementById("harga").value = item.harga;
    document.getElementById("jumlah").value = item.jumlah;
    editIndex = index;
}

function tampilData() {
    const tbody = document.getElementById("data");
    tbody.innerHTML = "";

    let grandTotal = 0;

    penjualan.forEach((item, index) => {
        const total = item.harga * item.jumlah;
        grandTotal += total;

        tbody.innerHTML += `
        <tr>
            <td>${item.nama}</td>
            <td>Rp ${item.harga}</td>
            <td>${item.jumlah}</td>
            <td>Rp ${total}</td>
            <td>
                <button onclick="editData(${index})">Edit</button>
                <button class="hapus" onclick="hapusData(${index})">Hapus</button>
            </td>
        </tr>
        `;
    });

    document.getElementById("grandTotal").innerText = grandTotal;
}

function hapusData(index) {
    penjualan.splice(index, 1);
    localStorage.setItem("penjualan", JSON.stringify(penjualan));
    tampilData();
}
