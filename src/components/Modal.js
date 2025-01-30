import React from 'react';
import './Modal.css';  // Ensure to create this CSS file for styling

const Modal = ({ show, onClose, language }) => {
    if (!show) return null; // Do not render the modal if not in "show" state

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{language === "Sinhala" ? "යෝජනා විස්තර" : "Proposal Details"}</h2>
                    <button onClick={onClose} className="close-button-icon">X</button>
                </div>
                <div className="modal-body">
                    {language === "Sinhala" ? (
                        <>
                            <div className="card">
                                <h3>ආයතනයේ සාරාංශය</h3>
                                <p>
                                    •	ආයතනයේ නම: ව්‍යාපාරයේ නිල නාමය.<br />
                                    •	ස්ථාපිත දිනය සහ ස්ථානය: ආයතනය ආරම්භ කළ දිනය සහ ස්ථානය.<br />
                                    •	ව්‍යාපාරයේ ව්‍යුහය: ඒකලා බලධාරී, සහකාරිත්වය, LLC, සමාගම වැනි ව්‍යුහය.<br />
                                    •	ප්‍රධාන වටිනාකම්: ආයතනයේ මූලධර්ම.<br />
                                    •	ප්‍රධාන ව්‍යාපාරික ක්‍රියාකාරකම්: ආයතනය කරන සේවා හෝ නිෂ්පාදන.<br />
                                    •	සාර්ථකත්වය: ලැබූ වැදගත් දියුණු කඩඉම්.<br />
                                    •	විශේෂිත ගුණාංගය (USP): ආයතනයේ විශේෂ ලක්ෂණ.
                                </p>
                            </div>
                            <div className="card">
                                <h3>දර්ශනයේ ප්‍රකාශය</h3>
                                <p>
                                    • ඉදිරියට ඇති අරමුන: දීර්ඝකාලීනව ලක්ෂ්‍යය.<br />
                                    • පොදු බලපෑම: සමාජ, ආර්ථික, පරිසර යන ක්ෂේත්‍රවල බලපෑම.<br />
                                    • අභිලාෂය: කාර්මික නායකත්වය හෝ නවෝත්පාදනය.
                                </p>
                            </div>

                            <div className="card">
                                <h3>මෙහෙයුම් ප්‍රකාශය</h3>
                                <p>
                                    • අරමුණ: ආයතනයේ මූලික හේතුව.<br />
                                    • ප්‍රධාන ක්‍රියාකාරකම්: අරමුණ ලඟා වීමට කරන ක්‍රියාකාරකම්.<br />
                                    • ග්‍රාහකයින්: සේවාවන් ලබා දෙන පිරිස්.<br />
                                    • වටිනාකම්: ආයතන ගතිගුණ හා ක්‍රියාකාරීත්ව මූලධර්ම.
                                </p>
                            </div>

                            <div className="card">
                                <h3>ප්‍රධාන සාරාංශය</h3>
                                <p>
                                    • ව්‍යාපාර සාරාංශය: ආයතනය, කර්මාන්තය සහ වෙළඳපොළේ සාරාංශය.<br />
                                    • ආරම්භක අරමුන: යෝජනාවේ අරමුණු.<br />
                                    • විසඳුම්: සේවා හෝ නිෂ්පාදන.<br />
                                    • මුල්‍ය තොරතුරු: මුල්‍ය ප්‍රතිඵල හෝ අරමුදල් අවශ්‍යතා.<br />
                                    • පියවරක් ගන්න: යෝජනාවෙන් පසු කිරීමට තිබෙන ක්‍රියා.
                                </p>
                            </div>

                            <div className="card">
                                <h3>හිමිකාරයින් සහ හවුල්කරුවන්ගේ විස්තර</h3>
                                <p>
                                    • ස්ථාපක තොරතුරු: පසුබැසීම සහ නිපුණතාව.<br />
                                    • හවුල්කාරිත්වය: කාර්ය සාධක හෝ සමෘද්ධි සහයෝග.<br />
                                    • අයිතියේ ව්‍යුහය: කොටස් අයිතිකාරිත්වය.
                                </p>
                            </div>

                            <div className="card">
                                <h3>ඉලක්කගත් වෙළඳපොළ සහ පාරිභෝගික කොටස්</h3>
                                <p>
                                    • ජනගහණය: වයස, ලිංගය, ආදායම.<br />
                                    • මනෝභාවය: කාර්යය, හැසිරීම, කැමැත්ත.<br />
                                    • භූගෝලය: සේවාවන් ලබා දෙන ප්‍රදේශ.<br />
                                    • ගැටළු: පාරිභෝගික ගැටළු.<br />
                                    • වෙළඳපොළේ ප්‍රමාණය: විය හැකි පාරිභෝගික සංඛ්‍යාව.
                                </p>
                            </div>

                            <div className="card">
                                <h3>කර්මාන්තය සහ ප්‍රවණතා</h3>
                                <p>
                                    • වෙළඳපොළ පසුබැසීම: කර්මාන්තය ගැන විස්තර.<br />
                                    • වර්ධන ප්‍රවණතා: නව අවස්ථා.<br />
                                    • අභියෝග: ප්‍රධාන බාධක.
                                </p>
                            </div>

                            <div className="card">
                                <h3>තරඟකරුවන්</h3>
                                <p>
                                    • තරඟකාර ලැයිස්තුව: සෘජු සහ අපෘජු තරඟකාර.<br />
                                    • වෙළඳපොළේ තත්වය: තරඟකාරයන්ගේ තත්ත්වය.<br />
                                    • SWOT විශ්ලේෂණය: ශක්ති, දුර්වලතා, අවස්ථා, අභියෝග.
                                </p>
                            </div>

                            <div className="card">
                                <h3>ගැටළු ප්‍රකාශය</h3>
                                <p>
                                    • හඳුනාගත් ගැටළු: වෙළඳපොළේ ගැටලු.<br />
                                    • පාරිභෝගිකයන්ට බලපෑම: ඒවාගේ බලපෑම.<br />
                                    • ප්‍රධාන හේතු: ගැටලුවේ මුල් හේතු.
                                </p>
                            </div>

                            <div className="card">
                                <h3>යෝජිත ව්‍යාපාරික විසඳුම</h3>
                                <p>
                                    • නිෂ්පාදනය/සේවාව: විසඳුම පිළිබඳ විස්තර.<br />
                                    • නවෝත්පාදන: විශේෂ ලක්ෂණ.<br />
                                    • ප්‍රතිලාභ: ගැටලුව විසඳන ආකාරය.<br />
                                    • විශාල ව්‍යාප්තිය: දිගහැරීමට හැකියාව.
                                </p>
                            </div>
                            <div className="card">
                                <h3>අලෙවිකරණය සහ අලෙවි තත්ත්වය</h3>
                                <p>
                                    • ඉලක්කගත් පිරිස: අලෙවිය අරමුණු කර ගන්නා පිරිස.<br />
                                    • අලෙවිය කලාපය: පාරිභෝගිකයන්ගේ ගැටලුවේ පිළිතුර ලෙස අලෙවිය.<br />
                                    • පොදු මාධ්‍ය: විකාශන, සමාජ මාධ්‍ය, මෙනෙවිය.<br />
                                    • මිලගණන්: නිෂ්පාදන/සේවාවන් සඳහා මිලදී ගැනීමේ ප්‍රතිපත්ති.<br />
                                    • ග්‍රාහක ආකර්ෂණය: ග්‍රාහකයින් නැවත පැමිණිමට සැලසුම්.
                                </p>
                            </div>

                            <div className="card">
                                <h3>ස්ථායි සෙර ගොවිතැන</h3>
                                <p>
                                    • පරිසර හිතකාමී ක්‍රම: කෘතිම රසායන වලින් තොර වගාව, ජලය ඉතිරි කිරීම.<br />
                                    • ජලය සහ විදුලි බලය: විශේෂිත ක්‍රම හෝ යන්ත්‍රාංග.<br />
                                    • අක්‍රිය වාස්තුවල පරිච්ඡේදනය: කෘතිම අක්‍රියතාව නිවැරදි කිරීම.
                                </p>
                            </div>

                            <div className="card">
                                <h3>සැපයුම් හා බෙදාහැරීමේ සැලැස්ම</h3>
                                <p>
                                    • සැපයුම්: මූලික වට්ටම් හෝ මූලධර්මය.<br />
                                    • ප්‍රවාහනය: බෙදා හැරීමේ ගමන් මාර්ගය.<br />
                                    • හවුල්කරුවන්: සැපයුම්කරුවන් හා බෙදාහරින්නන්.
                                </p>
                            </div>

                            <div className="card">
                                <h3>මෙහෙයුම් සැලැස්ම හා කාර්ය මණ්ඩලය</h3>
                                <p>
                                    • දිනපතා මෙහෙයුම්: ක්‍රියාකාරී ගැලපීම් හා කාලසටහන.<br />
                                    • අවශ්‍ය කාර්ය මණ්ඩලය: සේවකයින්ගේ භූමිකා.<br />
                                    • පුහුණු වැඩසටහන්: නවක සේවකයින් සඳහා පුහුණුව.
                                </p>
                            </div>

                            <div className="card">
                                <h3>අපනයන සැලැස්ම</h3>
                                <p>
                                    • ඉලක්කගත් වෙළඳපොළ: අපනයන සඳහා රටවල්.<br />
                                    • සීරුමාරු නීති: ආනයන/අපනයන නීති.<br />
                                    • ප්‍රවාහන සැලැසුම: නැව්ගත කිරීම් හා යන අන්තර්ජාතික බෙදාහරිම්.
                                </p>
                            </div>

                            <div className="card">
                                <h3>ගුණාත්මක පාලනය හා අනුකූලතාව</h3>
                                <p>
                                    • සංධාන: භාවිතා කළ යුතු මිනුම් මට්ටම්.<br />
                                    • පරීක්ෂාකිරීම්: භාණ්ඩ ගුණාත්මක බවට විශ්වාසය ලබාගැනීම.<br />
                                    • සහතිකකරණ: අත්‍යවශ්‍ය සමාජිකතා සහ කාර්මික අනුමත කිරීම්.
                                </p>
                            </div>

                            <div className="card">
                                <h3>තාක්ෂණය හා යටිතල පහසුකම්</h3>
                                <p>
                                    • මෘදුකාංග හා මෙවලම්: පරිපාලන සහ අලෙවිකරණය සඳහා භාවිතා කරන උපකරණ.<br />
                                    • IT යටිතල පහසුකම්: ජාල ක්‍රම හා දෘඩාංග.<br />
                                    • ඒකාබද්ධතාවය: වඩාත් පහසු ආකාරයට ක්‍රම ක්‍රියාත්මක කිරීම.
                                </p>
                            </div>

                            <div className="card">
                                <h3>විශාල ව්‍යාප්තියේ සැලැස්ම</h3>
                                <p>
                                    • වර්ධන අවස්ථා: නව වෙළඳපොළ, නිෂ්පාදන හෝ සේවාවන්.<br />
                                    • ගවේෂණ සහ සංවර්ධන: නවෝත්පාදන සැලසුම්.<br />
                                    • ස්වයංක්‍රීයනය: ක්‍රියා මාර්ග පහසුකරණය කිරීම.
                                </p>
                            </div>

                            <div className="card">
                                <h3>ආරක්ෂණ හා නීතිමය අනුකූලතාව</h3>
                                <p>
                                    • සයිබර් ආරක්ෂාව: දත්ත ආරක්ෂණය.<br />
                                    • නීතිමය අනුකූලතාව: ආයතන නීති අනුගමනය.<br />
                                    • පරීක්ෂාකරණ: ආරක්ෂණ අධීක්ෂණය.
                                </p>
                            </div>

                            <div className="card">
                                <h3>මුල්‍ය අනුමාන</h3>
                                <p>
                                    • ආදායම: කාලසටහන අනුව උපරිම අදායම.<br />
                                    • වියදම්: ස්ථිර හා වෙනස් වියදම්.<br />
                                    • ලාභය: ආර්ථිකව ලාභදායී බව.<br />
                                    • අරමුදල් අවශ්‍යතා: ඉදිරි වැඩ සඳහා අවශ්‍ය මූල්‍ය.
                                </p>
                            </div>
                            <div className="card">
                                <h3>ක්‍රියාත්මක කාලසටහන</h3>
                                <p>
                                    • දින වැඩිල්ල: ක්‍රියාත්මක ව්‍යාපෘති වසරන.<br />
                                    • සාර්ථකත්වය: අවසන් ලකුණු.<br />
                                    • නියමිත දිනයන්: සන්සුන් කාලසටහන.
                                </p>
                            </div>

                            <div className="card">
                                <h3>අවදානම් කළමනාකරණය</h3>
                                <p>
                                    • අවදානම් වර්ග: මෙහෙයුම් හා ආර්ථික අවදානම්.<br />
                                    • අවදානම් ලිහිල් කිරීම: අවදානම් අඩු කිරීමේ සැලසුම්.<br />
                                    • අවස්ථාවන්ට අනුව සැලැස්ම: විකල්ප.
                                </p>
                            </div>

                            <div className="card">
                                <h3>ප්‍රවාහනය හා බෙදාහැරීමේ සැලැසුම</h3>
                                <p>
                                    • ප්‍රවාහනය: බෙදාහැරීම් අධික්ෂණය.<br />
                                    • ගබඩා කිරීම: වෙළඳ ගබඩා සහ ඉතිරිය.<br />
                                    • විදෙස් වියදම් කළමනාකරණය: අඩු වියදම් යෝජනා.
                                </p>
                            </div>

                            <div className="card">
                                <h3>තාක්ෂණික හා වෛද්‍ය උපකරණ</h3>
                                <p>
                                    • උපකරණ විස්තර: යන්ත්‍ර විස්තර.<br />
                                    • නඩත්තුව: නියමිත නඩත්තු සටහන්.<br />
                                    • නවෝත්පාදනය: නව උපකරණ සොයා බැලීම.
                                </p>
                            </div>

                            <div className="card">
                                <h3>නීතිමය අනුකූලතාව සහ අවසර</h3>
                                <p>
                                    • අවශ්‍ය අවසර: ක්‍රියාකාරිත්වය සඳහා අවශ්‍ය බලපත්‍ර.<br />
                                    • අනුකූල නීති: ජාතික හා ජාත්‍යන්තර නීති.
                                </p>
                            </div>

                            <div className="card">
                                <h3>අනුකූල හා නීතිමය කටයුතු</h3>
                                <p>
                                    • සන්සුන් පරිසරය: අනුකූල ක්‍රමය.<br />
                                    • පරීක්ෂණ: නිතර පරීක්ෂාව.
                                </p>
                            </div>

                            <div className="card">
                                <h3>ස්ථානයේ විශ්ලේෂණය</h3>
                                <p>
                                    • ස්ථානයේ ලක්ෂණ: පසුබැසීම, පිරිවැය, සුදුසුකම්.<br />
                                    • SWOT විශ්ලේෂණය: ශක්ති, දුර්වලතා, අවස්ථා, තර්ජන.
                                </p>
                            </div>

                            <div className="card">
                                <h3>දිගුකාලීන ශාඛාව</h3>
                                <p>
                                    • කාබන් පද්ධති: පරිසරය හිතකාමී.<br />
                                    • සංරක්ෂණය: පරිසර සුරැකුම්.
                                </p>
                            </div>

                            <div className="card">
                                <h3>විෂය නිර්දේශ සැලැසුම</h3>
                                <p>
                                    • පාඨමාලා මොඩියුල: පාඩම් අංග.<br />
                                    • ඉගැන්වීමේ අරමුනු: ඉගෙනුම් කුසලතා.
                                </p>
                            </div>

                            <div className="card">
                                <h3>අනුමත කිරීම්</h3>
                                <p>
                                    • සහතිකීකරණ මට්ටම්: අනුමත මාර්ග.<br />
                                    • පරීක්ෂණය: අනුමත කිරීම් පවත්වාගෙන යාම.
                                </p>
                            </div>

                            <div className="card">
                                <h3>නික්ම යාමේ සැලැසුම</h3>
                                <p>
                                    • විකල්ප: ව්‍යාපාර විකුණා දැමීම, මාරු වීම, IPO.<br />
                                    • සැලසුම් ක්‍රියාත්මක කිරීම: කඩිනම් මාරු ක්‍රම.
                                </p>
                            </div>

                            <div className="card">
                                <h3>අවසානය</h3>
                                <p>
                                    • සාරාංශය: යෝජනාවේ සාරාංශය.<br />
                                    • අවසාන අදහස්: ව්‍යාපාරයේ හැකියාව.<br />
                                    • පියවරක් ගන්න: අනුමැතිය ලබාගැනීමේ යෝජනාව.
                                </p>
                            </div>
                        </>
                    ) : (

                        <>
                            <div className="card">
                                <h3>Company Overview</h3>
                                <p>
                                    • Brief introduction: name, location, and date established.<br />
                                    • Description of business: nature, focus, and products/services.<br />
                                    • Current achievements: milestones, certifications, or partnerships.
                                </p>

                            </div>
                            <div className="card">
                                <h3>Vision Statement</h3>
                                <p> •	A forward-looking statement about the company’s ultimate goal or purpose.<br />
                                    •	Example: “To become the leading provider of sustainable agricultural solutions worldwide.”
                                </p>
                            </div>
                            <div className="card">
                                <h3>Mission Statement</h3>
                                <p> •	The company’s current purpose and approach to achieving its vision.<br />
                                    •	Example: “To empower small farmers with affordable, eco-friendly technologies.”
                                </p>
                            </div>
                            <div className="card">
                                <h3>Executive Summary</h3>
                                <p> •	Overview of the entire proposal in a concise format.<br />
                                    •	Key points: problem, proposed solution, target audience, and expected outcomes.<br />
                                    •	Highlight financial and strategic benefits.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Problem Statement</h3>
                                <p> •	Current Challenges: Describe the issues the organization or target audience is facing.<br />
                                    •	Impact Analysis: Explain how these challenges affect operations, costs, or customer satisfaction.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Proposed Solution</h3>
                                <p> •	System Overview: Provide a clear description of the system being proposed.<br />
                                    •	Key Features and Functionalities: Detail the specific capabilities of the system (e.g., automation, analytics, data integration).<br />
                                    •	Use Case Scenarios: Provide examples of how the system will be used in real-world situations.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Owners & Partner Details</h3>
                                <p> •	Names, roles, and expertise of key stakeholders.<br />
                                    •	Ownership structure: partnerships, shares, or investments.<br />
                                    •	Brief bio emphasizing relevant experience.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Competitors</h3>
                                <p> •	List of key competitors and their strengths.<br />
                                    •	Comparison of products, services, or market share.<br />
                                    •	Explanation of how the business stands out.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Target Market and Customer Segments</h3>
                                <p> •	Farmers, distributors, or retailers.<br />
                                    •	Demographic and geographic focus.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Target Market and Customer Segments</h3>
                                <p> •	Use of renewable resources or eco-friendly methods.<br />
                                    •	Strategies for reducing carbon footprint.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Supply Chain and Distribution</h3>
                                <p> •	Overview of logistics: storage, packaging, and delivery.<br />
                                    •	Partnerships with transport or distribution companies.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Customer Experience and Engagement</h3>
                                <p> •	Plans for personalized services.<br />
                                    •	Technology adoption: mobile apps, virtual tours.<br />
                                    •	Guest feedback mechanisms.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Operational Plan and Staff</h3>
                                <p> •	Number of empoloyees<br />
                                    •	Hiring plans and training programs.<br />
                                    •	Day-to-day management and operational efficiency.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Production Plan</h3>
                                <p>• Details of manufacturing processes.<br />
                                    • Equipment, facilities, and raw material sources.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Export Strategy and Market Analysis</h3>
                                <p>• Target countries and market demand.<br />
                                    • Compliance with international standards.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Scalability and Innovation Plan</h3>
                                <p>• Future upgrades and innovations.<br />
                                    • Plans for handling increased demand.
                                </p>
                            </div>
                            <div className="card">
                                <h3>E-Commerce Platform and Technology</h3>
                                <p>• Details of the online platform: CMS, payment gateways, and integrations.<br />
                                    • Mobile app or website features.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Customer Acquisition and Retention Strategies</h3>
                                <p>• Loyalty programs, discounts, or personalized marketing.<br />
                                    • Use of CRM tools for engagement.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Curriculum Development</h3>
                                <p>• Program structure, syllabus, and learning outcomes.<br />
                                    • Integration of certifications or accreditations.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Regulatory and Compliance Considerations</h3>
                                <p>• Adherence to local and international health regulations.<br />
                                    • Certifications like FDA, WHO-GMP, or ISO standards.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Site Analysis and Feasibility Study</h3>
                                <p>• Location advantages and accessibility.<br />
                                    • Study on environmental or legal constraints.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Project Timeline and Phases</h3>
                                <p>• Key phases: planning, construction, and completion.<br />
                                    • Estimated timelines for each phase.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Sustainability and Environmental Impact</h3>
                                <p>• Renewable energy sources and carbon reduction plans.<br />
                                    • Waste management strategies.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Technology and Infrastructure</h3>
                                <p>• Equipment, plants, or grid systems used.<br />
                                    • Innovations in energy storage or distribution.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Technical Specifications</h3>
                                <p>• Technology Stack: Highlight the software, hardware, and tools that will be used.<br />
                                    • System Architecture: Briefly describe the architecture or include a diagram if needed.<br />
                                    • Integration Requirements: Specify how the system will integrate with existing infrastructure.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Monitoring and Evaluation</h3>
                                <p>• Performance Metrics: Explain how the system’s performance will be measured (KPIs).<br />
                                    • Feedback Mechanism: Describe how user feedback will be collected and integrated.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Financial Projection</h3>
                                <p>• Development Costs: Break down costs related to design, development, testing, and deployment.<br />
                                    • Maintenance and Support: Include estimated costs for ongoing support.<br />
                                    • Return on Investment (ROI): Highlight the financial benefits, cost savings, or revenue potential.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Risk Analysis and Mitigation</h3>
                                <p>• Potential Risks: Identify challenges during development and deployment (technical, financial, user adoption).<br />
                                    • Mitigation Strategies: Provide solutions to address these risks.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Exit Strategy</h3>
                                <p>• Plans for investors to exit: IPO, merger, acquisition, or buyout.<br />
                                    • Timelines and potential returns for stakeholders.
                                </p>
                            </div>
                            <div className="card">
                                <h3>Conclusion</h3>
                                <p>• Recap of key points.<br />
                                    • Emphasize the proposal’s value and urgency.<br />
                                    • Call to action, encouraging the reader to move forward.
                                </p>
                            </div>
                        </>
                    )}
                    <div className="modal-footer">
                        <button onClick={onClose} className="close-button">Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
