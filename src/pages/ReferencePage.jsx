import React from 'react';

function ReferencePage() {
  return (
      <div>
    <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>References</h1>
    <div className="container" style={{
                                   width: '80%',
                                   margin: '50px auto',
                                   fontFamily: 'Roboto, sans-serif',
                                   display: 'flex',
                                   justifyContent: 'space-around'
                                 }}>
      <div style={{ flex: 2 }}>

      <div className="reference" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
        <p>
          "Houston Roots: The Legacy of African American Music in Houston." <em>The Journal of Texas Music History</em>, vol. 21, Texas State University, 2021,{' '}
          <a href="https://www.txst.edu/ctmh/publications/journal/issues/jtmh-vol-21/vol-21-houston-roots.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2b6cb0', textDecoration: 'none' }}>
            https://www.txst.edu/ctmh/publications/journal/issues/jtmh-vol-21/vol-21-houston-roots.html
          </a>.
        </p>
      </div>
      <div className="reference" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
        <p>
          "Musical Migrations: The Sonic Traditions of Houston Brought and Shaped by Migrants in the Early Twentieth Century." <em>Houston History Magazine</em>, Apr. 2024,{' '}
          <a href="https://houstonhistorymagazine.org/2024/04/musical-migrations-the-sonic-traditions-of-houston-brought-and-shaped-by-migrants-in-the-early-twentieth-century/" target="_blank" rel="noopener noreferrer" style={{ color: '#2b6cb0', textDecoration: 'none' }}>
            https://houstonhistorymagazine.org/2024/04/musical-migrations-the-sonic-traditions-of-houston-brought-and-shaped-by-migrants-in-the-early-twentieth-century/
          </a>.
        </p>
      </div>
      <div className="reference" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
        <p>
          "The Legacy of Houston's Music Scene: From Beyoncé to ZZ Top." <em>Meadows Property Group</em>, Apr. 2024,{' '}
          <a href="https://meadowspropertygroup.com/2024/04/the-legacy-of-houston-music-scene-from-beyonce-to-zz-top/" target="_blank" rel="noopener noreferrer" style={{ color: '#2b6cb0', textDecoration: 'none' }}>
            https://meadowspropertygroup.com/2024/04/the-legacy-of-houston-music-scene-from-beyonce-to-zz-top/
          </a>.
        </p>
      </div>
      <div className="reference" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
        <p>
          "Houston Bound: Culture and Color in a Jim Crow City." <em>University of California Press</em>, 2019,{' '}
          <a href="https://dokumen.pub/houston-bound-culture-and-color-in-a-jim-crow-city-9780520958531.html" target="_blank" rel="noopener noreferrer" style={{ color: '#2b6cb0', textDecoration: 'none' }}>
            https://dokumen.pub/houston-bound-culture-and-color-in-a-jim-crow-city-9780520958531.html
          </a>.
        </p>
      </div>
      <div className="reference" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
        <p>
          "Banding Together for Texas: A Night of Healing, Hope, and Music." <em>JK Livin Foundation</em>,{' '}
          <a href="https://jklivinfoundation.org/events-post/banding-together-for-texas-a-night-of-healing-hope-and-music/" target="_blank" rel="noopener noreferrer" style={{ color: '#2b6cb0', textDecoration: 'none' }}>
            https://jklivinfoundation.org/events-post/banding-together-for-texas-a-night-of-healing-hope-and-music/
          </a>.
        </p>
      </div>
      <div className="reference" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
        <p>
          "Hurricane Harvey: Overview." <em>National Weather Service</em>,{' '}
          <a href="https://www.weather.gov/hgx/hurricaneharvey" target="_blank" rel="noopener noreferrer" style={{ color: '#2b6cb0', textDecoration: 'none' }}>
            https://www.weather.gov/hgx/hurricaneharvey
          </a>.
        </p>
      </div>
      <div className="reference" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
        <p>
          "Houston Symphony." <em>Houston Symphony</em>,{' '}
          <a href="https://houstonsymphony.org/32604-2/" target="_blank" rel="noopener noreferrer" style={{ color: '#2b6cb0', textDecoration: 'none' }}>
            https://houstonsymphony.org/32604-2/
          </a>.
        </p>
      </div>
      <div className="reference" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
        <p>
          "Houston Artists Recover from Hurricane Harvey and Band Together." <em>PaperCity Magazine</em>,{' '}
          <a href="https://www.papercitymag.com/arts/houston-artists-recover-hurricane-harvey-band-together" target="_blank" rel="noopener noreferrer" style={{ color: '#2b6cb0', textDecoration: 'none' }}>
            https://www.papercitymag.com/arts/houston-artists-recover-hurricane-harvey-band-together
          </a>.
        </p>
      </div>
      <div className="reference" style={{ marginBottom: '20px', lineHeight: '1.6' }}>
        <p>
          "Music Doing Good: Nonprofit Brings Music to Students in Need." <em>Houston Chronicle</em>, 9 Oct. 2017,{' '}
          <a href="https://www.chron.com/neighborhood/bellaire/news/article/Music-Doing-Good-nonprofit-brings-music-to-12249611.php" target="_blank" rel="noopener noreferrer" style={{ color: '#2b6cb0', textDecoration: 'none' }}>
            https://www.chron.com/neighborhood/bellaire/news/article/Music-Doing-Good-nonprofit-brings-music-to-12249611.php
          </a>.
        </p>
      </div>
      {/* Add all other references similarly */}
      </div>
      <div style={{ flex: 1 }}>

         <img src="/webmaster_copyright.jpg" />
      </div>
    </div>
    <iframe src="/Work Log.pdf" width="80%" height="600px" style={{ margin: '40px auto'}} ><p>Your browser does not support this element.</p></iframe>
    </div>
  );
}

export default ReferencePage;
