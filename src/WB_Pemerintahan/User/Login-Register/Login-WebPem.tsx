import { createSignal, Show } from "solid-js";
import "./Login-WebPem.css";
import "boxicons/css/boxicons.min.css";

function LoginForm() {
  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [showPassword, setShowPassword] = createSignal(false);
  const [error, setError] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const [showSuccessPopup, setShowSuccessPopup] = createSignal(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email(),
          password: password(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Store user data in localStorage if needed
        localStorage.setItem('userData', JSON.stringify(data.data));
        // Show success popup
        setShowSuccessPopup(true);
        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = "/DetailBerita-user";
        }, 2000);
      } else {
        setError(data.message || "Email atau password salah!");
      }
    } catch (err) {
      setError("Terjadi kesalahan. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="LoginWebPem-container">
      <Show when={showSuccessPopup()}>
        <div class="popup-overlay">
          <div class="modern-popup">
            <div class="success-animation">
              <div class="checkmark-circle">
                <div class="checkmark draw"></div>
              </div>
            </div>
            <div class="popup-content">
              <h3>Login Berhasil!</h3>
              <p>Selamat datang kembali</p>
              <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </Show>

      <div class="LoginWebPem-cover">
        <div class="LoginWebPem-front">
          <img src="src/WB_Pemerintahan/User/Assets/registerpemerintah.jpg" alt="Cover Image" />
          <div class="LoginWebPem-text">
            <span class="text-1">
              Website Resmi <br /> Pemerintah Kota Bandung
            </span>
          </div>
        </div>
      </div>
      <div class="LoginWebPem-forms">
        <div class="LoginWebPem-formcontent">
          <div class="LoginWebPem-signup">
            <div class="title">Selamat datang kembali!</div>
            <div class="title22">Masuk ke akun Anda di sini.</div>
            
            <Show when={error()}>
              <div class="error-message" style="color: red; margin-bottom: 1rem; text-align: center;">
                {error()}
              </div>
            </Show>

            <form onSubmit={handleSubmit}>
              <div class="input-boxes">
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
                    style="cursor: pointer;"
                  ></i>
                </div>
                <div class="button-LoginWebPem">
                  <input 
                    type="submit" 
                    value={loading() ? "Memproses..." : "Masuk"} 
                    disabled={loading()} 
                    style={loading() ? "opacity: 0.7;" : ""}
                  />
                </div>
                <div class="text sign-in-text">
                  Belum memiliki akun? <a href="/RegisterPemerintah">Daftar sekarang</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;