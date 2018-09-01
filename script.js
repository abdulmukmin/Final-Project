var dataPenjualan=[
    ["Tofan","8/25/18","4800",102000,100000,"WPU","Piutang"],
    ["Tofan","8/26/18","1274",206000,205000,"Bukalapak","Piutang"],
    ["Rican","8/27/18","1124",102000,100000,"Bukalapak","Piutang"],
    ["Ricky","8/28/18","3283",102000,100000,"WPU","Piutang"],
    ["Ricky","8/28/18","8297",102000,100000,"WPU","Piutang"],
    ["Ari","8/28/18","5930",12500,10649,"WPU","Piutang"],
    ["Bintara","8/29/18","0273",27000,25000,"Bukalapak","Piutang"],
    ["Ari","8/29/18","7715",12500,100000,"WPU","Piutang"],
    ["Febri","8/30/18","8329",103000,100080,"Bukalapak","Piutang"],
    ["Mumin","8/30/18","6654",50000,50000,"WPU","Piutang"],
    ["Mumin","8/30/18","6654",21000,21000,"WPU","Piutang"],
    ["Tofan","8/31/18","6649",102000,100000,"WPU","Piutang"],
    ["Tofan","8/31/18","6649",52000,50000,"Bukalapak","Piutang"],
    ["Tofan","8/31/18","6649",12500,12000,"Bukalapak","Piutang"],
    ["Siti","8/31/18","7271",27000,25000,"WPU","Piutang"],
    ["Bintara","8/31/18","9858",102000,100000,"WPU","Piutang"],
    ["Ardiman","8/31/18","7026",102000,100000,"WPU","Piutang"]
    ]

var dataPenerimaan=[
    ]

var dataPengeluaran=[
    ]

var dataPelanggan=[
    ['101Tof',"Tofan"],
    ['102Ric','Ricky'],
    ['103Ari',"Ari"],
    ['104Ric',"Rican"],
    ['105Bin',"Bintara"],
    ['106Feb',"Febri"],
    ['107Mum','Mumin'],
    ['108Sit','Siti']
]

function totalPenjualan(dataPenjualan){
    var totalHargaJual=0
    for (var i=0; i<dataPenjualan.length; i++){
            totalHargaJual += dataPenjualan[i][3]
    }
    //console.log(totalHargaJual)
    return totalHargaJual
}

function totalPembelian(dataPenjualan){
    var totalHargaBeli=0
    for (var i=0; i<dataPenjualan.length; i++){
            totalHargaBeli += dataPenjualan[i][4]
    }
    //console.log(totalHargaBeli)
    return totalHargaBeli
}

function detailTagihan(dataPenjualan,namaKonsumen){   
    var totalTagihan=0
    for (var i=0; i<dataPenjualan.length; i++){
        if(dataPenjualan[i][0]===namaKonsumen &&dataPenjualan[i][6]==='Piutang'){
            totalTagihan += dataPenjualan[i][3]
            var detailObj={
                'Tanggal Transaksi':dataPenjualan[i][1],
                'Nomor Tujuan':'xxx'+dataPenjualan[i][2],
                'Harga Jual':dataPenjualan[i][3]
            }
            masukkanKeTabel(detailObj)
            document.getElementById('namaPelanggan').innerHTML = dataPenjualan[i][0];
        }
    }
    document.getElementById('totalTagihan').innerHTML = formatUang(totalTagihan);    
}

function cariNamaPelanggan(){
    //ambil string dari inputan nama pelanggan
    var idPelanggan=document.getElementById("idPelanggan").value;
    if (idPelanggan===''){
        alert('Silahkan masukkan Customer ID anda')
    } else {
        var namaPelanggan=''
        for (var i=0; i<dataPelanggan.length; i++){
            if (dataPelanggan[i][0]===idPelanggan){
                namaPelanggan=dataPelanggan[i][1]
                break
            }
        }
        if (namaPelanggan===''){
            //document.getElementById('namaPelanggan').innerHTML ='Customer ID \''+idPelanggan+'\' Tidak ditemukan!';
            alert(idPelanggan+' tidak ditemukan, periksa kembali!')
            document.getElementById("idPelanggan").value=''
        } else {
            tampilkanDetailTagihan()
            detailTagihan(dataPenjualan,namaPelanggan)
        }
    }
}

function masukkanKeTabel(detail) {
    //alert("tes") //berhasil
    var table = document.getElementById("tabelDetailTagihan");
    var totalRow = table.getElementsByTagName("tr").length //menghitung jumlah row yang sudah ada
    var row = table.insertRow(totalRow);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = totalRow;
    cell2.innerHTML = detail['Tanggal Transaksi'];
    cell3.innerHTML = detail['Nomor Tujuan'];
    cell4.innerHTML = detail['Harga Jual'];
    disableButton()
}

function disableButton(){
    //disable button setelah di klik
    var x = document.getElementById("btnDetail");
    x.disabled=true
}

function formatUang(number) {
    var rupiah = '';
    var balik = '';
    var angkastr = String(number)
    //di balik/reverse dulu
    for (var i = angkastr.length-1; i >= 0; i--) {
      balik = balik + angkastr[i]
    }
    //di beri titik setiap looping senilai modulus 3
    for (var j = 0; j < balik.length; j++) {
      if (j % 3 ===0) {
         rupiah += balik.substr(j,3)+'.';
      }
    }
    //dibalik lagi
    var hasil = ""
    for (var i = rupiah.length-2; i >= 0; i--) {
      hasil += rupiah[i]
    }
    return "Rp. "+ hasil +",00"
}

function tampilkanDetailTagihan(){
    var f = document.getElementById('frmDetailTagihan')
    f.style.display='block'
}
