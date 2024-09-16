import Array "mo:base/Array";
import Func "mo:base/Func";
import Hash "mo:base/Hash";

import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Option "mo:base/Option";

actor {
  // Define the TaxPayer type
  type TaxPayer = {
    tid: Text;
    firstName: Text;
    lastName: Text;
    address: Text;
  };

  // Create a stable variable to store the TaxPayer records
  stable var taxPayerEntries : [(Text, TaxPayer)] = [];
  var taxPayers = HashMap.HashMap<Text, TaxPayer>(10, Text.equal, Text.hash);

  // System functions for upgrades
  system func preupgrade() {
    taxPayerEntries := Iter.toArray(taxPayers.entries());
  };

  system func postupgrade() {
    taxPayers := HashMap.fromIter<Text, TaxPayer>(taxPayerEntries.vals(), 10, Text.equal, Text.hash);
  };

  // Function to add a new TaxPayer record
  public func addTaxPayer(tid: Text, firstName: Text, lastName: Text, address: Text) : async () {
    let newTaxPayer : TaxPayer = {
      tid = tid;
      firstName = firstName;
      lastName = lastName;
      address = address;
    };
    taxPayers.put(tid, newTaxPayer);
  };

  // Function to get all TaxPayer records
  public query func getAllTaxPayers() : async [TaxPayer] {
    return Iter.toArray(taxPayers.vals());
  };

  // Function to search for a TaxPayer record by TID
  public query func searchTaxPayer(tid: Text) : async ?TaxPayer {
    return taxPayers.get(tid);
  };
}