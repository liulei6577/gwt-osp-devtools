import Rule = chrome.declarativeNetRequest.Rule;
import RuleActionType = chrome.declarativeNetRequest.RuleActionType;
import ResourceType = chrome.declarativeNetRequest.ResourceType;

chrome.runtime.onInstalled.addListener(() => {

    const initialRules: Rule[] = [
        {
            id: 1,
            priority: 1,
            action: {
                type: RuleActionType.REDIRECT,
                redirect: {
                    url: chrome.runtime.getURL('redirect/ext-language_tools.js')
                }
            },
            condition: {
                urlFilter: 'ext-language_tools.js',
                resourceTypes: [
                    ResourceType.SCRIPT
                ]
            }
        },
        {
            id: 2,
            priority: 1,
            action: {
                type: RuleActionType.REDIRECT,
                redirect: {
                    url: chrome.runtime.getURL('redirect/javascript.js')
                }
            },
            condition: {
                urlFilter: 'snippets/javascript.js',
                resourceTypes: [
                    ResourceType.SCRIPT
                ]
            }
        },
    ];

    chrome.declarativeNetRequest.getDynamicRules((rules) => {
        const oldRulesIds = rules.map(r => r.id);
        chrome.declarativeNetRequest.updateDynamicRules(
            {
                addRules: initialRules,
                removeRuleIds: oldRulesIds
            },
            () => {
            }
        );
    });

});