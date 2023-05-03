import BankOfAmerica from "../../../assets/images/boa.png";
import FirstRepublic from "../../../assets/images/first_republic.jpg";
import WesternAllicance from "../../../assets/images/western_alliance.jpg";
import CNB from "../../../assets/images/city_national.png";
import WellsFargo from "../../../assets/images/wells_fargo.png";
import FirstFoundationBank from "../../../assets/images/first_foundation.png";
import CitiBank from "../../../assets/images/citibank.png";
import GSB from "../../../assets/images/goldman_sachs.png";
import MTBank from "../../../assets/images/m&t.png";
import NYCB from "../../../assets/images/nycb.jpg";

export default function getImageFromBankName(bank: string) {
	switch (bank) {
		case "First Republic Bank":
			return FirstRepublic;
		case "Western Alliance Bank":
			return WesternAllicance;
		case "Bank of America (BOA)":
			return BankOfAmerica;
		case "Wells Fargo (WF)":
			return WellsFargo;
		case "Citi Bank":
			return CitiBank;
		case "Goldman Sachs (GSB)":
			return GSB;
		case "New York Community Bank (NYCB)":
			return NYCB;
		case "M&T Bank":
			return MTBank;
		case "City National Bank (CNB)":
			return CNB;
		case "First Foundation Bank":
			return FirstFoundationBank;
		default:
			return null;
	}
}
