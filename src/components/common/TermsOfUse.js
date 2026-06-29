import React from 'react'

const TermsOfUse = () => {
  return (
    <div className='TermsOfUse'>
      <h2>Terms of Use</h2>

      <h4>Service</h4>
      <p>
        Art Club is an online gallery and community platform for art club members.
        The service allows members to create a profile, upload artwork, and participate
        in club activities.
      </p>

      <h4>Administrator</h4>
      <p>
        <b>Virva Svala</b><br />
        Helsinki, Finland<br />
        <a href='mailto:virva.svala@artclub.com'>virva.svala(at)artclub.com</a>
      </p>

      <h4>Membership</h4>
      <p>
        Access to the service requires registration and approval by an administrator.
        Registered users are initially assigned the role of <em>non-member</em> until
        their membership application is reviewed and approved.
      </p>

      <h4>User content and artwork uploads</h4>
      <p>
        Members may upload up to 10 images to their personal gallery. By uploading an
        image, you confirm that you are the creator of the work and hold the rights to
        share it on this platform.
      </p>
      <p>Recommended image specifications:</p>
      <ul>
        <li>Format: JPG</li>
        <li>Width: 600 px, Height: 500 px</li>
        <li>Resolution: 72 dpi</li>
        <li>Maximum file size: 5 MB</li>
      </ul>
      <p>
        Images that violate copyright, contain offensive material, or are otherwise
        inappropriate may be removed by the administrator without notice.
      </p>

      <h4>Artist profile and introduction</h4>
      <p>
        Members can create a personal profile with a short introduction text. This
        information is displayed publicly alongside your artwork in the gallery.
        Keep your profile information accurate and up to date.
      </p>

      <h4>Events</h4>
      <p>
        Club events are visible to logged-in members only. Event information is
        managed by administrators and is intended for club use.
      </p>

      <h4>Acceptable use</h4>
      <p>Users agree not to:</p>
      <ul>
        <li>Upload content they do not own or have rights to share</li>
        <li>Attempt to access other members&apos; accounts or data</li>
        <li>Use the service for any unlawful purpose</li>
      </ul>

      <h4>Privacy</h4>
      <p>
        Personal data collected through this service is handled in accordance with
        our <a href='/privacy'>Privacy Policy</a>.
      </p>

      <h4>Contact</h4>
      <p>
        For questions about these terms, contact:{' '}
        <a href='mailto:virva.svala@artclub.com'>virva.svala(at)artclub.com</a>
      </p>
    </div>
  )
}

export default TermsOfUse
