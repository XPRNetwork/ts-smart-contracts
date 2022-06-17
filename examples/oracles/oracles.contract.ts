import { Name, Contract, TableStore, print, printStorage } from 'proton-tsc'
import { ConfigSingle, Data, Feed, ProviderPoint, ProviderSingle, ORACLES_CONTRACT } from 'proton-tsc/oracles';

@contract
export class OraclesTestContract extends Contract {
    feedTable: TableStore<Feed> = new TableStore<Feed>(ORACLES_CONTRACT)
    dataTable: TableStore<Data> = new TableStore<Data>(ORACLES_CONTRACT)

    @action("test")
    test(): void {
        printStorage()

        const feed = this.feedTable.requireGet(0, "feed not found")
        print(`
            Index: ${feed.index}
            Name: ${feed.name}
            Description: ${feed.description}
            Aggregate Function: ${feed.aggregate_function}
            Data Type: ${feed.data_type}
            Config:
            \t${feed.config.map<string>((conf: ConfigSingle) => `${conf.key}: ${conf.value}`).join('\n\t\t')}
            Providers:
            \t${feed.providers.map<string>((conf: ProviderSingle) => `${conf.key}: ${conf.value}`).join('\n\t\t')}
        `)

        const data = this.dataTable.requireGet(0, "data not found")
        print(`
            Feed Index: ${data.feed_index}
            Aggregate: ${data.aggregate.f64Value}
            Points:
            \t${data.points.map<string>((conf: ProviderPoint) => `${conf.provider}: ${conf.data.f64Value} - ${conf.time}`).join('\n\t\t')}
        `)
    }
}