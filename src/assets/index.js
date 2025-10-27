import me from "./images/me.jpg";
import digifigs from "./images/digifigs.png";
import swiftbranding from "./images/swiftbranding.png";

// Real app screenshots
import sqeApp1 from "./images/sqe/sqe_1.png";
import sqeApp2 from "./images/sqe/sqe_2.png";
import sqeApp3 from "./images/sqe/sqe_3.png";
import sqeApp4 from "./images/sqe/sqe_4.png";
import sqeApp5 from "./images/sqe/sqe_5.png";
import sqeApp6 from "./images/sqe/sqe_6.png";
import sqeApp7 from "./images/sqe/sqe_7.png";

import pakaApp1 from "./images/paka/paka_1.png";
import pakaApp2 from "./images/paka/paka_1a.png";
import pakaApp3 from "./images/paka/paka_1b.png";
import pakaApp4 from "./images/paka/paka_1c.png";
import pakaApp5 from "./images/paka/paka_2.png";
import pakaApp6 from "./images/paka/paka_3.png";
import pakaApp7 from "./images/paka/paka_4.png";

// Export original images
export {
  me,
  digifigs,
  swiftbranding
};

// Export real app screenshots - using first image as the main one
export const sqeApp = sqeApp1;
export const pakaApp = pakaApp1;
export const invoiceValidator = swiftbranding; // Keep placeholder for now

// Export arrays of all screenshots for potential gallery use
export const sqeScreenshots = [sqeApp1, sqeApp2, sqeApp3, sqeApp4, sqeApp5, sqeApp6, sqeApp7];
export const pakaScreenshots = [pakaApp1, pakaApp2, pakaApp3, pakaApp4, pakaApp5, pakaApp6, pakaApp7];
