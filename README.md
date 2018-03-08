# API Connect Log Tailer

When working on API Connect infrastructure issues it is often useful to the log files stored locally without needing to download everything.

This script creates an SSH session to the desired API Connect Management appliance and tails the desired file. It writes the files to a local file in the specified directory.


We created this script while debugging split brain scenario.


This is provided with no warranty. Use at your own risk!

# To install

* Extract the git repository
* Run the following command to install dependencies
```npm i```

# To Run

``` node index.js ```

This then asks the following questions

```
? API Manager Host exposing port 22 <APIC HOST>
? Admin user's Password [hidden]
? Output Directory ./out/
```

You are then asked to select one or more files from the check box list. These are the files that are tailed and streamed to a local file. IT IS NOT RECOMMENDED TO REQUEST MORE THEN FIVE FILES.

```
Select which files to tail. It is not recommended to tail more then a few files (Press <space> to select, <a> to toggle all, <i> to invert selection)
 == Common Files ==
❯◯ /var/log/messages
◯ /var/log/cmc.out
◯ /var/log/couchdb/couch.log
◯ /var/log/informix/jsonListener.log
 == Other Files ==
◯ /var/log/install
```

For a complete list of files please see the end of this READ ME.






## Files that can be selected
```
'/var/log/messages',
 '/var/log/cmc.out',
 '/var/log/couchdb/couch.log',
 '/var/log/informix/jsonListener.log',
 '/var/log/install',
 '/var/log/billing.log',
 '/var/log/arbd_stdout.log',
 '/var/log/couchdb/couchdb_post_boot.log',
 '/var/log/databaseCleanup.log',
 '/var/log/migration.log',
 '/var/log/hasd.log',
 '/var/log/couchdb_replication.log',
 '/var/log/logrotate.status',
 '/var/log/v2apimanager.log',
 '/var/log/default-trace',
 '/var/log/systemmanager.log',
 '/var/log/status.log',
 '/var/log/essync.log',
 '/var/log/apim_rproxy_rewrite.log',
 '/var/log/product-insights.log',
 '/var/log/logstash.log',
 '/var/log/logstashconfigure.log',
 '/var/log/informix/online.log',
 '/var/log/informix/apim-init.log',
 '/var/log/informix/connectmgr.log',
 '/var/log/config_backup.log',
 '/var/log/router.log',
 '/var/log/kibana.log',
 '/var/log/arbd.log',
 '/var/log/couchdb_replication_sessions.log',
 '/var/log/ secure',
 '/var/log/topology-config.json',
 '/var/log/arbd_stderr.log',
 '/var/log/router.stat',
 '/var/log/platinfo',
 '/var/log/health_check.log',
 '/var/log/spam.log',
 '/var/log/couchdb_replication_etag.log',
 '/var/log/elasticsearch/apiconnect_analytics.log',
 '/var/log/elasticsearch/es_startup_tasks.log',
 '/var/log/elasticsearch/apiconnect_analytics_deprecation.log',
 '/var/log/elasticsearch/apiconnect_analytics_index_search_slowlog.log',
 '/var/log/elasticsearch/apiconnect_analytics_index_indexing_slowlog.log',
 '/var/log/elasticsearch/elasticsearch.log',
 '/var/log/couchdb_replication_apim.log',
 '/var/log/apim_rproxy_access.log',
 '/var/log/sessions.log',
 '/var/log/cron',
 '/var/log/apim_rproxy_error.log',
 'tmp/informix/onstat-a.out',
 'tmp/informix/onstat-gses0.out',
 'tmp/informix/onstat-stkall.out',
 'tmp/informix/onstat-a.out',
 'tmp/userfiles/bedrock-pd.txt'```
