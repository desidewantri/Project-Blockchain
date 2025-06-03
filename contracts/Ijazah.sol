// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ijazah {
    struct DataIjazah {
        string nama;
        string nim;
        string jurusan;
        string ipk;
        string tahun;
    }

    mapping(string => DataIjazah) public ijazahById;

    function simpanIjazah(
        string memory idIjazah,
        string memory nama,
        string memory nim,
        string memory jurusan,
        string memory ipk,
        string memory tahun
    ) public {
        ijazahById[idIjazah] = DataIjazah(nama, nim, jurusan, ipk, tahun);
    }

    function verifikasiIjazah(string memory idIjazah) public view returns (
        string memory, string memory, string memory, string memory, string memory
    ) {
        DataIjazah memory data = ijazahById[idIjazah];
        return (data.nama, data.nim, data.jurusan, data.ipk, data.tahun);
    }
}
