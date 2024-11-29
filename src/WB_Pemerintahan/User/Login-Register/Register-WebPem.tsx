import { createSignal, Show } from "solid-js";
import { onMount } from "solid-js";
import "./Register-WebPem.css";
import "boxicons/css/boxicons.min.css";

const SuccessPopup = (props) => {
  onMount(() => {
    // Set timeout untuk menutup popup dan redirect setelah 3 detik
    setTimeout(() => {
      props.onClose();
    }, 3000);
  });
  return (
    <div class="popup-overlay">
      <div class="modern-popup">
        <div class="success-animation">
          <div class="checkmark-circle">
            <div class="checkmark draw"></div>
          </div>
        </div>
        <div class="popup-content">
          <h3>Registrasi Berhasil!</h3>
          <p>Akun anda telah berhasil dibuat</p>
          <div class="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

function SignupForm() {
  const [fullName, setFullName] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [phone, setPhone] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(false);
  const [error, setError] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const [showSuccessPopup, setShowSuccessPopup] = createSignal(false);

  const handlePopupClose = () => {
    setShowSuccessPopup(false);
    window.location.href = "/LoginPemerintah";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('http://127.0.0.1:8080/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: fullName(),
          email: email(),
          password: password(),
          phone_number: phone(),
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data in localStorage
        localStorage.setItem("UserPemerintahData", JSON.stringify(data.data));
        console.log("Pendaftaran berhasil!");
        // Show success popup
        setShowSuccessPopup(true);
      } else {
        setError(data.message || "Terjadi kesalahan saat mendaftar");
      }
    } catch (err) {
      setError("Terjadi kesalahan koneksi ke server");
      console.error("Registration error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Show popup using Show component from Solid.js */}
      <Show when={showSuccessPopup()}>
        <SuccessPopup onClose={handlePopupClose} />
      </Show>

      <div class="RegisterWebPem-container">
        <div class="RegisterWebPem-cover">
          <div class="RegisterWebPem-front">
            <img src="src/WB_Pemerintahan/User/Assets/registerpemerintah.jpg" alt="Cover Image" />
            <div class="RegisterWebPem-text">
              <span class="text-1">
                Website Resmi <br /> Pemerintah Kota Bandung
              </span>
            </div>
          </div>
        </div>
        <div class="RegisterWebPem-forms">
          <div class="RegisterWebPem-formcontent">
            <div class="RegisterWebPem-signup">
              <div class="title">
                Selamat datang di portal resmi <br />
                <span>Pemerintah Kota Bandung!</span>
              </div>
              <div class="titlee">Buat akun sekarang!</div>
              {error() && <div class="error-message" style="color: red; margin-bottom: 10px;">{error()}</div>}
              <form onSubmit={handleSubmit}>
                <div class="input-boxes">
                  <div class="input-box">
                    <i class="bx bx-user"></i>
                    <input 
                      type="text" 
                      placeholder="Nama Lengkap" 
                      required 
                      value={fullName()} 
                      onInput={(e) => setFullName(e.target.value)}
                      disabled={loading()} 
                    />
                  </div>
                  <div class="input-box">
                    <i class="bx bx-envelope"></i>
                    <input 
                      type="email" 
                      placeholder="Email" 
                      required 
                      value={email()} 
                      onInput={(e) => setEmail(e.target.value)}
                      disabled={loading()} 
                    />
                  </div>
                  <div class="input-box">
                    <i class="bx bx-lock"></i>
                    <input 
                      type={showPassword() ? "text" : "password"} 
                      placeholder="Password" 
                      required 
                      value={password()} 
                      onInput={(e) => setPassword(e.target.value)}
                      disabled={loading()} 
                    />
                    <i 
                      class={`bx ${showPassword() ? "bx-show" : "bx-hide"}`} 
                      onClick={() => setShowPassword(!showPassword())}
                    ></i>
                  </div>
                  <div class="input-box">
                    <i class="bx bx-phone"></i>
                    <input 
                      type="tel" 
                      placeholder="No. Telepon" 
                      required 
                      value={phone()} 
                      onInput={(e) => setPhone(e.target.value)}
                      disabled={loading()} 
                    />
                  </div>
                  <div class="button-RegisterWebPem">
                    <input 
                      type="submit" 
                      value={loading() ? "Mendaftar..." : "Daftar akun"} 
                      disabled={loading()}
                    />
                  </div>
                  <div class="text sign-up-text">
                    Sudah memiliki akun? <a href="/LoginPemerintah">Masuk sekarang</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupForm;