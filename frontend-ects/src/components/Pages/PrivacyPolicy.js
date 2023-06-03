import React from 'react';
import { Link } from 'react-router-dom';
import './PrivacyPolicy.css'

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy">
      <h2>Πολιτική Απορρήτου</h2>
      <p>
        Το κείμενο αυτό ορίζει τα δεδομένα που συλλέγουμε, τον τρόπο που χρησιμοποιούνται και τα μέτρα που λαμβάνονται για να διασφαλιστεί η προστασία τους. 
      </p>
      <h3>Συλλογή Δεδομένων</h3>
      <p>
        Δεν αποθηκεύουμε τα προσωπικά δεδομένα των χρηστών μας, εκτός από αυτά που σχετίζονται με το πρόγραμμα σπουδών, τη διάρθρωση των πανεπιστημιακών μαθημάτων και τους βαθμούς που εισάγουν οι χρήστες. Οι πληροφορίες σχετικά με τις βαθμολογίες τηρούνται τοπικά στον χρήστη και δεν αποθηκεύονται στη βάση δεδομένων του ECTS Calculator.
      </p>
      <h3>Διαχείριση Δεδομένων (GDPR)</h3>
      <p>
        Τα δεδομένα που συλλέγουμε από τους χρήστες μας χρησιμοποιούνται αποκλειστικά για τη παροχή προσωποποιημένης εμπειρίας και τη βελτίωση της λειτουργικότητας της ιστοσελίδας. Δεν χρησιμοποιούμε τα δεδομένα για άλλο σκοπό και δεν τα μοιραζόμαστε με τρίτους.
      </p>
      <h3>Ασφάλεια Δεδομένων</h3>
      <p>
        Έχουμε λάβει όλα τα απαραίτητα τεχνικά και οργανωτικά μέτρα για να προστατεύσουμε την πρόσβαση, χρήση και δημοσιοποίηση των δεδομένων σας. Τα μέτρα αυτά ελέγχονται και ανανεώνονται τακτικά για τη διασφάλιση υψηλού επιπέδου προστασίας των δεδομένων σας.
      </p>
      <h3>Δικαιώματα Χρήστη</h3>
      <p>
        Το ECTS Calculator τηρεί πλήρως τον Γενικό Κανονισμό για την Προστασία Δεδομένων (GDPR) της Ευρωπαϊκής Ένωσης (ΕΕ). Οι πολίτες της ΕΕ έχουν το δικαίωμα της πρόσβασης στα προσωπικά τους δεδομένα, της αίτησης για διόρθωση ή διαγραφή τους και της άρνησης στη χρήση τους. Αν επιθυμείτε να ασκήσετε κάποιο από αυτά τα δικαιώματα, μπορείτε να <Link to="/contact"> επικοινωνήσετε μαζί μας</Link>.
      </p>
      <p>
        Το κείμενο ανανεώθηκε στις 31 Ιαν 2023.
      </p>

        {/* At [Your Website Name], we are committed to protecting the privacy and security of our users. This Privacy Policy sets out the type of information we collect, how we use it, and the steps we take to ensure that your data is protected.
        
        Information Collection

        We do not collect any personal information from our users, except for information related to university courses names, ECTS, university curriculum structure, and grades input by users. The grades input by users are stored locally on their client side and not stored in a database by [Your Website Name].

        Information Usage

        The information we collect from our users is used solely for the purpose of providing a personalized educational experience and improving the functionality of our website. We do not use the information for any other purposes or share it with any third parties.

        Data Security

        We take the security of your data seriously and have implemented appropriate technical and organizational measures to protect your information from unauthorized access, disclosure, or misuse. We regularly review and update these measures to ensure the highest level of security.

        EU Citizens' rights

        As our website is mainly used by EU citizens, we are fully compliant with the EU General Data Protection Regulation (GDPR). EU citizens have the right to access their personal information, request its correction or deletion, and object to its processing. If you would like to exercise any of these rights, please contact us at [Your Email Address].

        Changes to this Privacy Policy

        We may update this Privacy Policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will provide notice of any material changes to this Privacy Policy through our website.

        Contact Information

        If you have any questions or concerns about our Privacy Policy or the information we collect and use, please contact us at [Your Email Address]. 
        Last updated [Insert Date].
        */}
    </div>
  );
};

export default PrivacyPolicy;