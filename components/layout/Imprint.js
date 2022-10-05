import { useEffect, useRef } from "react";
import { BsX } from "react-icons/bs"

export default function Imprint({ screen, isImprint, setisImprint }) {
    const topRef = useRef(null)
    useEffect(() => {
        if (topRef && topRef.current) {
            topRef.current.scrollIntoView()
        }
    }, [isImprint])
  return <>
    <div onClick={() => setisImprint(false)} 
        className={`${isImprint ? 'visible' : 'hidden'} fixed inset-0 backdropNO bg-black/60 center z-[1000] cursor-alias`}
        >
        <div style={{ maxHeight: screen.height-200, border: '2px solid blue' }} 
            onClick={(e) => e.stopPropagation() }
            className={`relative
                w-11/12 max-w-2xl px-4 py-3 sm:px-8 sm:py-4
                bg-stone-800 text-white
                rounded-3xl shadow-2xl shadow-black
                ring ring-white/30
                max-h-screen overflow-y-scroll
                cursor-default
            `}>
            <div ref={topRef} className={`absolute top-0`}/>
            <div className={``}>
                <span className="font-bold">Imprint</span>
                <BsX className="fixed left-0 top-0 mt-2 ml-2 cursor-pointer text-gray-300 hover:text-white" onClick={() => setisImprint(false)} size={30}/>
                <br/><br/>
                <span className="font-bold">Credits:</span>
                <br/>
                Design &amp; Development:&nbsp;<br/><br/>
                <a href="https://synesthesigns.com/"
                    rel="noreferrer" 
                    target='_blank'
                    className='cursor-pointer synesthesigns font-bold w-fit'
                    >
                    SYNESTHESIGNS
                </a>
                <br/>
                {/* Development:&nbsp;
                <a href="https://synesthesigns.com/"
                    rel="noreferrer" 
                    target='_blank'
                    className='cursor-pointer synesthesigns font-bold w-fit'
                    >
                    Synesthesigns
                </a> */}
                <br/>

                <span className="font-bold">Contact:</span><br/>

                Verantwortlich für den Inhalt nach §55 Abs. 2 RStV:<br/>
                Jakob Kirpal, Humboldtstr. 166, 28203 Bremen<br/>
                +49 152 576, kirpal.jakob@gmail.com, USt-IdNr. XXXX, Finanzamt XXXX
                <br/><br/>
                <span className="font-bold">Copyright:</span><br/>
                Unless otherwise indicated, all material on this website is copyrighted by Jakob Kirpal. All rights reserved. No part of this website, either text or image may be used for any purpose other than personal use. Reproduction, modification, storage in a retrieval system or retransmission, in any form or by any means, electronic, mechanical or otherwise, for reasons other than personal use, is strictly prohibited without prior written consent.
                <br/><br/>
                <span className="font-bold">Haftungsausschluss:</span><br/>
                § 1 Warnhinweis zu Inhalten Die kostenlosen und frei zugänglichen Inhalte dieser Webseite wurden mit größtmöglicher Sorgfalt erstellt. Der Anbieter dieser Webseite übernimmt jedoch keine Gewähr für die Richtigkeit und Aktualität der kostenlos und frei zugänglich bereitgestellten Inhalte. Namentlich gekennzeichnete Beiträge geben die Meinung des jeweiligen Autors und nicht immer die Meinung des Anbieters wieder. Allein durch den Aufruf der kostenlosen und frei zugänglichen Inhalte kommt keinerlei Vertragsverhältnis zwischen dem Nutzer und dem Anbieter zustande, insoweit fehlt es am Rechtsbindungswillen des Anbieters.
                <br/><br/>
                § 2 Externe Links Diese Website enthält Verknüpfungen zu Websites Dritter (“externe Links”). Diese Websites unterliegen der Haftung der jeweiligen Betreiber. Der Anbieter hat bei der erstmaligen Verknüpfung der externen Links die fremden Inhalte daraufhin überprüft, ob etwaige Rechtsverstöße bestehen. Zu dem Zeitpunkt waren keine Rechtsverstöße ersichtlich. Der Anbieter hat keinerlei Einfluss auf die aktuelle und zukünftige Gestaltung und auf die Inhalte der verknüpften Seiten. Das Setzen von externen Links bedeutet nicht, dass sich der Anbieter die hinter dem Verweis oder Link liegenden Inhalte zu Eigen macht. Eine ständige Kontrolle der externen Links ist für den Anbieter ohne konkrete Hinweise auf Rechtsverstöße nicht zumutbar. Bei Kenntnis von Rechtsverstößen werden jedoch derartige externe Links unverzüglich gelöscht.
                <br/><br/>
                § 3 Urheber- und Leistungsschutzrechte Die auf dieser Website veröffentlichten Inhalte unterliegen dem deutschen Urheber- und Leistungsschutzrecht. Jede vom deutschen Urheber- und Leistungsschutzrecht nicht zugelassene Verwertung bedarf der vorherigen schriftlichen Zustimmung des Anbieters oder jeweiligen Rechteinhabers. Dies gilt insbesondere für Vervielfältigung, Bearbeitung, Übersetzung, Einspeicherung, Verarbeitung bzw. Wiedergabe von Inhalten in Datenbanken oder anderen elektronischen Medien und Systemen. Inhalte und Rechte Dritter sind dabei als solche gekennzeichnet. Die unerlaubte Vervielfältigung oder Weitergabe einzelner Inhalte oder kompletter Seiten ist nicht gestattet und strafbar. Lediglich die Herstellung von Kopien und Downloads für den persönlichen, privaten und nicht kommerziellen Gebrauch ist erlaubt. Die Darstellung dieser Website in fremden Frames ist nur mit schriftlicher Erlaubnis zulässig. 
                <br/><br/>
                § 4 Besondere Nutzungsbedingungen Soweit besondere Bedingungen für einzelne Nutzungen dieser Website von den vorgenannten Paragraphen abweichen, wird an entsprechender Stelle ausdrücklich darauf hingewiesen. In diesem Falle gelten im jeweiligen Einzelfall die besonderen Nutzungsbedingungen.
                <br/><br/>
                <span className='font-bold'>Haftung für Inhalte:</span>
                <br/>
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </div>
        </div>
    </div>
  </>
}
