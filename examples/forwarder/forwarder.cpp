#include <eosio/eosio.hpp>

class [[eosio::contract]] forwarder : public eosio::contract {
public:
   using contract::contract;

   [[eosio::action]]
   void abc(int64_t value){}
};

extern "C" {
   [[eosio::wasm_entry]]
   void apply( uint64_t receiver, uint64_t code, uint64_t action ) {
      if(code != receiver) {
         require_recipient("sf"_n);
         require_recipient("sf"_n);
      }
   }
}
