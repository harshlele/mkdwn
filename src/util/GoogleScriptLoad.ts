export const loadGoogleScript = () => {
    const id = 'google-js';
    const src = 'https://apis.google.com/js/api.js'; 
    
    // We have at least one script (React)
    const firstJs = document.getElementsByTagName('script')[0];
    
    // Prevent script from loading twice
    if (document.getElementById(id)) { return; }
    const js = document.createElement('script');
    js.id = id;
    js.src = src;
    js.onload = (window as any).OnGoogleScriptLoad; 
    firstJs?.parentNode?.insertBefore(js, firstJs);
}