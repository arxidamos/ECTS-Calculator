import React from 'react';
import { Link } from 'react-router-dom';
import './PrivacyPolicy.css'

const TermsOfService = () => {
  return (
    <div className="privacy-policy">
      <h2>Όροι Χρήσης</h2>
      <p>
        Το ECTS Calculator είναι ένα εργαλείο υπολογισμού των απαιτήσεων ολοκλήρωσης του προγράμματος σπουδών του Τμήματος Πληροφορικής και Τηλεποικοινωνιών της Σχολής Θετικών Επιστημών του ΕΚΠΑ. Πριν χρησιμοποιήσετε αυτή την εφαρμογή, διαβάστε προσεκτικά τους ακόλουθους όρους και προϋποθέσεις. 
      </p>
      <h3>1. Αποδοχή Όρων</h3>
      <p>
        Με τη χρήση της εφαρμογής αποδέχεστε τους όρους και προϋποθέσεις και συμφωνείτε ότι είστε υπεύθυνοι για τη συμμόρφωση με το ισχύον νομοθετικό πλαίσιο. Εάν δεν συμφωνείτε με κάποιον από αυτούς τους όρους, απαγορεύεται η χρήση αυτού του ιστοτόπου.
      </p>
      <h3>2. Χρήση του ECTS Calculator</h3>
      <p>
        Η σελίδα μας σχεδιάστηκε για να βοηθήσει τους φοιτητές του Τμήματός μας στη διαχείριση και την καταγραφή των ECTS τους. Χρησιμοποιώντας αυτό το εργαλείο, συμφωνείτε να:

        - Μην δημοσιεύετε παραπλανητικές πληροφορίες ή πληροφορίες που μπορεί να είναι επιζήμιες για τη Σχολή.

        - Χρησιμοποιείτε τη σελίδα μόνο για προσωπική και μη εμπορική χρήση.

        - Μην αντιγράφετε, τροποποιείτε, αναπαράγετε την εφαρμογή ή μέρος αυτής χωρίς την προηγούμενη συγκατάθεσή μας.

        - Μας αναφέρετε άμεσα τυχόν θέματα ή κενά ασφαλείας που υπέπεσαν στην αντίληψή σας.
      </p>
      <h3>3. Περιορισμός Ευθυνών</h3>
      <p>
        Διατηρούμε το δικαίωμα να τροποποιούμε ή να ανανεώνουμε τους όρους της υπηρεσίας μας ανά πάσα στιγμή χωρίς προειδοποίηση. Μπορείτε να επισκέπτεστε αυτή τη σελίδα για ενημερώσεις σχετικά με τους όρους χρήσης.
      </p>
      <h3>4. Τροποποίηση Όρων</h3>
      <p>
        Το περιεχόμενο της σελίδας παρέχεται ως έχει. Δεν φέρουμε ευθύνη για την ακρίβεια ή την πληρότητα των πληροφοριών που παρέχονται μέσω της υπηρεσίας μας. Δεν φέρουμε επίσης ευθύνη για τυχόν απώλειες ή ζημίες που μπορεί να προκύψουν από τη χρήση της υπηρεσίας μας ή την αδυναμία πρόσβασης σε αυτήν.
      </p>
      <h3>5. Επικοινωνία</h3>
      <p>
        Αν έχετε οποιαδήποτε απορία σχετικά με τους όρους χρήσης της σελίδας μας, μπορείτε να <Link to="/contact"> επικοινωνήσετε μαζί μας</Link>.
      </p>
      <p>
        Το κείμενο ανανεώθηκε στις 31 Ιαν 2023.
      </p>

        {/* Welcome to our ECTS tool for university curriculum! Before you start using this app, please read the following terms and conditions carefully.

          Acceptance of Terms

          By accessing or using our ECTS tool, you agree to be bound by these Terms and Conditions, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.

              Use of the ECTS Tool

          Our ECTS tool is designed to help students and faculty members manage and track academic credits for university courses. By using this tool, you agree to:

              Provide accurate and complete information about yourself, including your name, email address, and any other requested information.

              Use the tool only for its intended purposes and in accordance with these Terms and Conditions.

              Not use the tool for any illegal or unauthorized purposes.

              Not copy, modify, distribute, sell, or transfer any part of the tool without our prior written consent.

              Report any security issues or vulnerabilities you discover to us immediately.

              Data Privacy

          We take the privacy and security of your data seriously. By using our ECTS tool, you agree to our Privacy Policy, which outlines how we collect, use, and protect your personal information. We will never share your data with third parties without your explicit consent, unless required by law.

              Intellectual Property

          Our ECTS tool and all of its content, features, and functionality are owned by us or our licensors and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works of any part of our ECTS tool without our prior written consent.

              Disclaimer of Warranties and Limitation of Liability

          Our ECTS tool is provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the operation of the tool or the information, content, materials, or products included in it. We will not be liable for any damages arising from the use of the tool, including but not limited to direct, indirect, incidental, punitive, and consequential damages.

              Changes to the Terms and Conditions

          We reserve the right to modify these Terms and Conditions at any time. Your continued use of the ECTS tool after any changes to the Terms and Conditions will constitute your acceptance of those changes.

          If you have any questions or concerns about these Terms and Conditions, please contact us at [contact email address].
        */}
    </div>
  );
};

export default TermsOfService;