<template>
    <section
      id="contact"
      class="contact-page"
    >
      <div class="contact-container">
  
        <div class="contact-grid">
          <!-- Contact Info -->
          <div class="contact-info">
            <h3 class="section-subtitle">Let's Connect</h3>
            <p class="info-text">
              I'm currently available for freelance work and full-time opportunities.
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
  
            <div class="info-items">
              <div class="info-item">
                <div class="icon-bg blue">
                  <svg
                    class="icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="info-label">Email</p>
                  <p class="info-value">khikho107@gmail.com</p>
                </div>
              </div>
  
              <div class="info-item">
                <div class="icon-bg green">
                  <svg
                    class="icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="info-label">Location</p>
                  <p class="info-value">Dumaguete City, Philippines</p>
                </div>
              </div>
  
              <div class="info-item">
                <div class="icon-bg purple">
                  <svg
                    class="icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="info-label">Availability</p>
                  <p class="info-value">Open to opportunities</p>
                </div>
              </div>
            </div>
  
            <!-- Social Links -->
            <div class="social-links">
              <h4 class="section-subtitle">Follow Me</h4>
              <div class="social-icons">
                <a
                  v-for="(social, index) in socialLinks"
                  :key="index"
                  :href="social.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="social-icon"
                  :aria-label="social.name"
                >
                  <component :is="social.icon" class="social-svg" />
                </a>
              </div>
            </div>
          </div>
  
          <!-- Contact Form -->
          <div class="contact-form-container">
            <h3 class="section-subtitle">Send Message</h3>
  
            <form @submit.prevent="handleSubmit" class="contact-form">
              <div class="form-row two-cols">
                <div class="form-group">
                  <label for="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    v-model="formData.name"
                    required
                    placeholder="Your name"
                  />
                </div>
                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    v-model="formData.email"
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
  
              <div class="form-group">
                <label for="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  v-model="formData.subject"
                  required
                  placeholder="What's this about?"
                />
              </div>
  
              <div class="form-group">
                <label for="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  v-model="formData.message"
                  required
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
  
              <button
                type="submit"
                :disabled="isSubmitting"
                class="btn-submit"
              >
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>
  
              <p
                v-if="submitStatus === 'success'"
                class="submit-message success"
              >
                Thank you for your message! I'll get back to you soon.
              </p>
              <p
                v-if="submitStatus === 'error'"
                class="submit-message error"
              >
                Oops! Something went wrong. Please try again later.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const formData = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const isSubmitting = ref(false);
  const submitStatus = ref<'idle' | 'success' | 'error'>('idle');
  
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdkzbgqp';
  
  const handleSubmit = async () => {
    isSubmitting.value = true;
    submitStatus.value = 'idle';
  
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData.value),
      });
  
      if (response.ok) {
        submitStatus.value = 'success';
        formData.value = { name: '', email: '', subject: '', message: '' };
      } else {
        submitStatus.value = 'error';
      }
    } catch {
      submitStatus.value = 'error';
    } finally {
      isSubmitting.value = false;
    }
  };
  
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Jahjah07',
      icon: {
        template: `
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        `
      }
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/jahred-uy-693116214/',
      icon: {
        template: `
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        `
      }
    },
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/jahred.uy.9',
      icon: {
        template: `
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
          </svg>
        `
      }
    },
    {
      name: 'Email',
      url: 'mailto:khikho107@gmail.com',
      icon: {
        template: `
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        `
      }
    }
  ];
  </script>
  
  <style scoped>
  /* Page background and padding */
  .contact-page {
    min-height: 100vh;
    padding: 3rem 1rem 4rem;
    background: linear-gradient(135deg, #f0f4ff, #ffe6f0);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #3a2a3a;
    overflow-y: auto;
  }
  
  /* Main container */
  .contact-container {
    max-width: 1200px;
    width: 100%;
    margin-top: 6rem;
    background: white;
    border-radius: 24px;
    box-shadow: 0 10px 30px rgba(255, 150, 190, 0.25);
    padding: 1rem 3rem;
    border: 3px solid transparent;
    background-clip: padding-box;
    transition: border-color 0.3s ease;
  }
  
  .contact-container:hover {
    border-color: #ff6fa3;
    box-shadow: 0 12px 40px rgba(255, 111, 163, 0.4);
  }
  
  /* Header */
  .contact-header {
    text-align: center;
    margin-bottom: 3rem;
  }
  
  .contact-title {
    font-size: 2.8rem;
    font-weight: 800;
    color: #d6336c;
    text-shadow: 0 2px 6px rgba(214, 51, 108, 0.5);
    letter-spacing: 0.03em;
    margin-bottom: 0.5rem;
  }
  
  .underline {
    height: 5px;
    width: 100px;
    margin: 0 auto 1.5rem;
    border-radius: 50px;
    background: linear-gradient(90deg, #d6336c, #ff6fa3);
  }
  
  .contact-description {
    font-size: 1.2rem;
    color: #5a2a42;
    line-height: 1.7;
    max-width: 600px;
    margin: 0 auto;
  }
  
  /* Grid layout */
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
  
  /* Contact Info */
  .contact-info {
    display: flex;
    flex-direction: column;
  }
  
  .section-subtitle {
    font-size: 1.9rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #d6336c;
    text-shadow: 0 1px 4px rgba(214, 51, 108, 0.3);
    user-select: none;
  }
  
  .info-text {
    color: #5a2a42;
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
  
  /* Info Items */
  .info-items {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .info-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: #fff0f8;
    border-radius: 14px;
    padding: 1rem 1.25rem;
    box-shadow: 0 3px 10px rgba(255, 111, 163, 0.15);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  .info-item:hover {
    background: #ffd9e8;
    box-shadow: 0 5px 15px rgba(255, 111, 163, 0.25);
  }
  
  .icon-bg {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    flex-shrink: 0;
    box-shadow: 0 3px 10px rgba(255, 111, 163, 0.3);
  }
  
  .icon-bg.blue {
    background: #5a96ff;
  }
  
  .icon-bg.green {
    background: #66bb6a;
  }
  
  .icon-bg.purple {
    background: #a97bd8;
  }
  
  .icon {
    width: 24px;
    height: 24px;
  }
  
  /* Info text */
  .info-label {
    font-weight: 600;
    color: #b2225e;
    margin-bottom: 0.2rem;
    user-select: none;
  }
  
  .info-value {
    color: #6a405e;
    font-size: 1rem;
    user-select: text;
  }
  
  /* Social Links */
  .social-links {
    margin-top: 3rem;
  }
  
  .social-icons {
    display: flex;
    gap: 1.25rem;
  }
  
  .social-icon {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: #ffd9e8;
    border-radius: 14px;
    width: 42px;
    height: 42px;
    color: #d6336c;
    transition: background-color 0.3s ease, color 0.3s ease;
    cursor: pointer;
  }
  
  .social-icon:hover {
    background: #d6336c;
    color: white;
  }
  
  .social-svg {
    width: 20px;
    height: 20px;
    pointer-events: none;
  }
  
  /* Contact Form */
  .contact-form-container {
    background: #fff0f8;
    border-radius: 24px;
    padding: 2rem 2.5rem;
    box-shadow: 0 8px 30px rgba(255, 111, 163, 0.2);
  }
  
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
  
  .form-row.two-cols {
    display: flex;
    gap: 1rem;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  
  label {
    font-weight: 600;
    color: #b2225e;
    margin-bottom: 0.3rem;
    user-select: none;
  }
  
  input,
  textarea {
    padding: 0.75rem 1rem;
    border-radius: 12px;
    border: 2px solid #d6336c;
    font-size: 1rem;
    font-family: inherit;
    color: #5a2a42;
    background: white;
    transition: border-color 0.3s ease;
  }
  
  input::placeholder,
  textarea::placeholder {
    color: #cc7fa7;
    font-style: italic;
  }
  
  input:focus,
  textarea:focus {
    outline: none;
    border-color: #ff6fa3;
    box-shadow: 0 0 8px #ff6fa3aa;
  }
  
  /* Submit button */
  .btn-submit {
    background: linear-gradient(90deg, #d6336c, #ff6fa3);
    color: white;
    font-weight: 700;
    border: none;
    border-radius: 30px;
    padding: 0.85rem 1.5rem;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.3s ease;
    user-select: none;
    margin-top: 1rem;
  }
  
  .btn-submit:disabled {
    background: #f7a7bf;
    cursor: not-allowed;
  }
  
  .btn-submit:hover:not(:disabled) {
    background: linear-gradient(90deg, #ff6fa3, #d6336c);
  }
  
  /* Submit messages */
  .submit-message {
    margin-top: 1rem;
    font-weight: 600;
    font-size: 1rem;
    user-select: none;
  }
  
  .submit-message.success {
    color: #4caf50;
  }
  
  .submit-message.error {
    color: #e53935;
  }
  
  /* Responsive */
  @media (max-width: 900px) {
    .contact-grid {
      grid-template-columns: 1fr;
    }
  
    .form-row.two-cols {
      flex-direction: column;
    }
  }
  </style>
  