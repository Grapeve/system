<!-- eslint-disable no-undef -->
<script setup>
import { ref, onBeforeMount } from 'vue'
import { ethers } from 'ethers'
import { abi, contractAddress } from '@/utils/constants.js'

const metamask = ref(null)
const connectStatus = ref(false)
const ethAmount = ref('')

const connectMetamask = async () => {
  if (metamask.value) {
    try {
      await metamask.value.request({ method: 'eth_requestAccounts' })
      connectStatus.value = true
    } catch (error) {
      console.log(error)
    }
  } else {
    ElMessage({
      message: `Please install metamask!`,
      type: 'error'
    })
  }
}

const fund = async () => {
  console.log(`Funding with ${ethAmount.value}...`)
  if (connectStatus.value) {
    // provider / connection to the blockchain
    // signer / wallet / someone with some gas
    // contract that we are interacting with
    // abi & address
    const provider = new ethers.BrowserProvider(metamask.value)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try {
      const transactionResponse = await contract.fund({ value: ethers.parseEther(ethAmount.value) })
      await listenForTransactionMine(transactionResponse, provider)
      ethAmount.value = ''
      ElMessage({
        message: `Done!`,
        type: 'success'
      })
    } catch (error) {
      console.log(error.reason)
    }
  } else {
    ElMessage({
      message: `Please connect metamask!`,
      type: 'error'
    })
  }
}

const listenForTransactionMine = async (transactionResponse, provider) => {
  console.log(`Mining ${transactionResponse.hash}...`)
  return new Promise((resolve) => {
    provider.once(transactionResponse.hash, async (transactionReceipt) => {
      ElMessage({
        message: `Completed with ${await transactionReceipt.confirmations()} confirmations.`,
        type: 'success'
      })
      resolve()
    })
  })
}

const getBalance = async () => {
  if (connectStatus.value) {
    const provider = new ethers.BrowserProvider(metamask.value)
    const balance = await provider.getBalance(contractAddress)
    ElMessage({
      message: `Balance: ${ethers.formatEther(balance)} ETH`,
      type: 'success'
    })
  } else {
    ElMessage({
      message: `Please connect metamask!`,
      type: 'error'
    })
  }
}

const ownerWithdraw = async () => {
  if (connectStatus.value) {
    console.log('Withdraw....')
    const provider = new ethers.BrowserProvider(metamask.value)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(contractAddress, abi, signer)
    try {
      const contractResponse = await contract.withdraw()
      await listenForTransactionMine(contractResponse, provider)
    } catch (error) {
      console.log(error)
    }
  } else {
    ElMessage({
      message: `Please connect metamask!`,
      type: 'error'
    })
  }
}

onBeforeMount(() => {
  if (typeof window.ethereum !== 'undefined') {
    metamask.value = window.ethereum
    console.log('I see a metamask!')
  } else {
    console.log('No metamask!')
  }
})
</script>

<template>
  <div class="blockchain-container">
    <el-card class="blockchain">
      {{ metamask ? 'Browser has metamask!' : 'Please install metamask!' }}<br /><br />
      <el-button type="primary" @click="connectMetamask">
        {{ connectStatus ? 'Connected!' : 'Connect' }}
      </el-button>
      <br /><br />
      <el-button type="primary" @click="fund"> Fund </el-button>
      <el-input v-model="ethAmount" placeholder="0.01" style="width: 150px; margin: 0 12px" />
      <span>ETH Amount</span><br /><br />
      <el-button type="primary" @click="getBalance">Get Balance</el-button>
      <el-button type="primary" @click="ownerWithdraw">Withdraw</el-button>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.blockchain {
  min-height: 300px;
}
</style>
