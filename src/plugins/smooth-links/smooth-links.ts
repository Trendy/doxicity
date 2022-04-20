import type { DoxicityPlugin } from 'src/utilities/types';

/** Makes in-page links scroll smoothly. */
export default function (): DoxicityPlugin {
  return {
    transform: doc => {
      const script = doc.createElement('script');
      script.type = 'module';
      script.textContent = `
        document.addEventListener('click', event => {
          const link = event.target.closest('a');
          const id = (link?.hash ?? '').substr(1);

          if (id) {
            const target = document.getElementById(id);
            if (target) {
              event.preventDefault();
              window.scroll({
                top: target.offsetTop,
                behavior: 'smooth'
              });
            }
          }
        });
      `;

      doc.body.append(script);

      return doc;
    }
  };
}
