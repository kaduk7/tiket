import { createClient } from "@supabase/supabase-js"

const currentTime= new Date();

export let supabaseUrl = 'https://kqgopmfqfjqagcsgzrtw.supabase.co'
export let supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtxZ29wbWZxZmpxYWdjc2d6cnR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0NzczMDYsImV4cCI6MjAyNTA1MzMwNn0.zxN-y_T415-LkCot9V3i87uxMK-nbPriSVi8O2jZwBo'
export let supabaseBUCKET = 'uploadfile'
export const supabase = createClient(supabaseUrl, supabaseKey)

export function kalkulasiWaktu(newsTime: any) {
    const timeDifference = currentTime.getTime() - new Date(newsTime).getTime();
    const Hari = Math.floor(timeDifference / (24 * 1000 * 60 * 60));
    const Jam = Math.floor(timeDifference / (1000 * 60 * 60));
    const Menit = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const Detik = Math.floor((timeDifference % (1000 * 60)) / 1000);

    if (Hari <= 0 && Jam <= 0 && Menit <= 0) {
        return ` Baru saja`;
    }
    if (Hari <= 0 && Jam <= 0) {
        return ` ${Menit} menit yang lalu`;
    }
    if (Hari <= 0 && Jam > 0) {
        return ` ${Jam} jam yang lalu`;
    }
    if (Hari > 0 && Hari <= 30) {
        return `${Hari} hari yang lalu`;
    }

    if (Hari > 30 && Hari <= 360) {
        const bulan = Math.floor(timeDifference / (24 * 1000 * 60 * 60) / 30);
        return `${bulan} bulan yang lalu`;
    }

    if (Hari > 360) {
        const tahun = Math.floor(timeDifference / (24 * 1000 * 60 * 60) / 360);
        return `${tahun} tahun yang lalu`;
    }
}

export const StyleSelect = {
    control: (provided: any, state: any) => ({
        ...provided,
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: 17,
        boxShadow: state.isFocused ? '0 0 0 2px #007bff' : null,
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        fontSize: 20,
        color: "black",
        fontFamily: "initial",
    }),
    menu: (provided: any) => ({
        ...provided,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    }),
    menuList: (provided: any) => ({
        ...provided,
        maxHeight: '180px',
        overflowY: 'auto',
    }),
};

export const warnastatus = (status: any) => {
    switch (status) {

      case 'Proses':
        return 'lightblue';

      case 'Selesai':
        return 'green';

      case 'Tolak':
        return 'red';

      case 'Verifikasi':
        return 'yellow';

      case 'Dalam Proses':
        return 'lightblue';

    }
  };

  export const tglIndo=()=>{

  }