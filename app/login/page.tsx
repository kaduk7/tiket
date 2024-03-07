"use client"
import { signIn } from "next-auth/react";
import { SyntheticEvent, useState } from "react";
import Swal from "sweetalert2";
import CryptoJS from 'crypto-js';

const Login = () => {
  const [hp, setHp] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [st, setSt] = useState(false);
  const kunci1 = 'Bismillahirrahmanirrahim Allahuakbar ZikriAini2628';
  const kunci2 = 'Iikagennishiro Omaee Omaedakega Tsurainanteomounayo Zenin Kimochiwa Onajinanda';

  const [isLoading, setIsLoading] = useState(false)
  if (isLoading) {
    Swal.fire({
      title: "Mohon tunggu!",
      html: "Sedang validasi data",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    })
  }

  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


  const handleSubmit = async (e: SyntheticEvent) => {

    setIsLoading(true)

    const enkripPertama = CryptoJS.AES.encrypt(passwordText, kunci1).toString();
    const password = CryptoJS.AES.encrypt(enkripPertama, kunci2).toString();
    e.preventDefault();
    const login = await signIn('credentials', {
      hp,
      password,
      redirect: false
    })

    setTimeout(function () {
      if (login?.error) {
        setIsLoading(false)
        Toast.fire({
          icon: 'warning',
          title: 'Username atau password salah'
        })

        return
      }
      else {

        setIsLoading(false)
        window.location.href = '/'
      }
    }, 2000);
  };

  return (
    <div className="authincation h-100 common-img-bg">
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-lg-6 col-md-12 col-sm-12 mx-auto align-self-center">
          <div className="login-form">
            <div className="text-center">
              <img src="/tema/images/logohks.png" width='200' height='200' className="mt-5 mb-3" alt="" />
              <h3 className="title" >Dinas Kebersihan dan Kesehatan</h3>
              <p>Selamat Datang di Website Dinas Kebersihan dan Kesehatan</p>
            </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="mb-1" ></label>
                  <input
                    type="text"
                    className="form-control form-control"
                    onChange={(e) => setHp(e.target.value)}
                    placeholder="No Hp"
                  />
                </div>
                <div className="mb-4 position-relative">
                <label className="mb-1" ></label>
                  <input
                    required
                    value={passwordText}
                    type={st ? "text" : "password"}
                    className="form-control form-control"
                    onChange={(e) => setPasswordText(e.target.value)}
                    placeholder="Password"

                  />

                  <span className="show-pass eye">
                    {st ?
                      <a onClick={() => setSt(!st)} className="" >
                        <i className="mdi mdi-eye" />
                      </a>
                      :
                      <a onClick={() => setSt(!st)} className="" >
                        <i className="mdi mdi-eye-off" />
                      </a>
                    }
                  </span>
                </div>
                <div className="text-center mb-4">
                  <button type="submit" className="btn btn-info  btn-block">
                    Sign In
                  </button>
                </div>


              </form>
            </div>
          </div>

      </div>
    </div>
  </div>

  )
}

export default Login