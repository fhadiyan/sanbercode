const prompt = require('prompt-sync')(); 
const sqrt = Math.sqrt; 


const input = prompt("Masukkan bilangan genap: ");
const x = Number(input);


if (isNaN(x)) {
    console.log("Harap masukkan angka yang valid!");
} else if (x < 0) {
    console.log("Tidak bisa input bilangan negatif");
} else if (x % 2 !== 0) {
    console.log("Tidak bisa input bilangan ganjil");
} else {
    const result = sqrt(x);
    console.log(`Akar kuadrat dari ${x} adalah ${result}.`);
}