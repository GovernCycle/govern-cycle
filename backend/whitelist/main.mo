import Map "mo:map/Map";
import { phash } "mo:map/Map";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import UserVal "../validations/user";

actor WhiteList {

    let whitelist = Map.new<Principal, Bool>();

    stable var authors : [Text] = [
        "hyagt-lc2eh-ltnc5-laqjt-adpxt-ldez2-ckfcj-bn6e4-iee4f-s76zf-nae"
    ];

    for (author in authors.vals()) {
        let user = Principal.fromText(author);
        Map.set(whitelist, phash, user, true);
    };

    public shared ({ caller }) func addWhitelist(principal : Principal) : async UserVal.AuthenticationResult {
        if (await isWhitelisted(caller)) {
            Map.set(whitelist, phash, principal, true);
            return #ok(#SuccessText("User added to whitelist"));
        };
        return #err(#UserNotAuthorized);
    };

    public func getAllWhitelist() : async [Principal] {
        return Iter.toArray(Map.keys(whitelist));
    };

    public func isWhitelisted(principal : Principal) : async Bool {
        return Map.has(whitelist, phash, principal);
    };

};
